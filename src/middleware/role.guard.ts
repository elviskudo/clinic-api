import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entity/profile/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'src/entity/role.entity';
import { format_json } from 'src/env';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1]; 
    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      const decodedToken = this.jwtService.verify(token);
      const user = await this.findUserById(decodedToken.userId);

      if (!user || !user.role_id) {
        return false;
      }

      const userRoles = await Promise.all(roles.map(roleName => this.findRole(roleName)));
      const userRoleIds = userRoles.map(role => role.id);

      const hasRole = userRoleIds.includes(user.role_id);
      return hasRole;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async findUserById(userId: number): Promise<User> {
    return this.userRepository.findOne({ where : { id: userId } });
  }

  async findRole(role: string): Promise<Role> {
    return this.roleRepository.findOne({ where : { name: role } });
  }
}
