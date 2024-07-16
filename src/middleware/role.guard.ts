import { Injectable, CanActivate, ExecutionContext, HttpException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { format_json } from 'src/env';
import { Response } from 'express';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const token = request.headers.authorization?.split(' ')[1]; 
    if (!token) {
      this.throwFormattedException(response, 400, 'Token not found', 'UnauthorizedException');
      return false;
    }
  
    try {
      const decodedToken = this.jwtService.verify(token);
      const user = await this.findUserById(decodedToken.userId);
  
      if (!user || !user.role_id) {
        this.throwFormattedException(response, 403, 'Access denied', 'ForbiddenException');
        return false;
      }
  
      const userRoles = await Promise.all(roles.map(roleName => this.findRole(roleName)));
      const userRoleIds = userRoles.filter(role => role !== null).map(role => role.id);
  
      if (!userRoleIds.includes(user.role_id)) {
        this.throwFormattedException(response, 403, 'Access denied', 'ForbiddenException');
        return false;
      }
      return true;
    } catch (error: any) {
      this.throwFormattedException(response, 400, 'Invalid token to get role', error.message);
      return false;
    }
  }

  async findUserById(userId: string) {
    return await this.prisma.user.findUnique({ where : { id: userId } });
  }

  async findRole(role: string){
    return await this.prisma.role.findFirst({ where : { name: role } });
  }

  private throwFormattedException(response: Response, status: number, message: string, exceptionType: string) {
    const formattedResponse = format_json(
      status,
      false,
      message,
      null,
      message,
      exceptionType,
    );
    response.status(status).json(formattedResponse);
  }
}
