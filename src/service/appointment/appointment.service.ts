import { Injectable, Param, ParseIntPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import { AppointMentEntity } from 'src/entity/appointment/appointment.entity';
import { empty } from '@prisma/client/runtime/library';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(AppointMentEntity)
    private readonly AppointmentReposity: Repository<AppointMentEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async getAll(token: string, user_id: number) {
    const extracttoken = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
      const userId = extracttoken.userId;

      if(!user_id) {
        return {
          status: false,
          message: 'params wajib di isi',
          data: {
            date: false,
            time: null
          },
        };
      }
     
        const records = await this.AppointmentReposity.find({
          where: {
            user_id: user_id,
          },
        });

      if (records && records.length > 0) {
        return {
          status: true,
          message: 'Success ambil data appointment',
          data: {
            date: true,
            time: records
          },
        };
      } else {
        return {
          status: false,
          message: 'tidak ada data yang berhasil di ambil',
          data: {
            date: false,
            time: null
          },
        };
      }
    } else {
      return {
        status: false,
        message: 'Invalid token',
        data: {
          date: false,
          time: null
        },
      };
    }
  }
  
}
