import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PrismaService } from 'src/prisma.service';
import { Repository } from 'typeorm';
import { ZodError, z } from 'zod';
import * as jwt from 'jsonwebtoken';
import { connect } from 'http2';

@Injectable()
export class ProfileConfigurationService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async findByUserId(token: string) {
    const extracttoken = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
      var userId = extracttoken.userId;
    }

    return await this.prisma.profileConfiguration.findFirst({
      where: {
        user_id : userId
      },
      include: {
        user: true
      }
    });
  }

  async update(
    token: string,
    data,
  ) {
    const extracttoken = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
      var userId = extracttoken.userId;
    }

    const check = await this.prisma.profileConfiguration.findFirst({
      where: {
        user_id : userId
      },
      include: {
        user: true
      }
    });

    if(check){
      const update = await this.prisma.profileConfiguration.update({
        where: {
          id : check.id
        },
        data:  Object.assign(check, data),
        include: {
          user: true
        }
      });

      return update
    } else {
      const create = await this.prisma.profileConfiguration.create({
        data: {
          isLocation: true,
          isPushNotification: true,
          isEmailNotification: true,
          user : {
            connect: {
              id: userId
            }
          }
        },
        include: {
          user: true
        }
      });
    }
  }
}
