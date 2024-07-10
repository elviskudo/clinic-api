import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { FeedbackDTO } from 'src/dto/feedback.dto';
import { PrismaService } from 'src/prisma.service';
import { ZodError, z } from 'zod';

@Injectable()
export class FeedbackService {
  constructor(
    private prisma: PrismaService
  ) {}

  async getdata(token: string) {
    try {
      const find = await this.prisma.feedback.findMany({
        include : {
          user: true
        }
      })

      return {
        status: true,
        message: 'Success to get data',
        data: find,
      };

    } catch (e: any) {
      if (e instanceof ZodError) {
        const errorMessages = e.errors.map((error) => ({
          field: error.path.join('.'),
          message: error.message,
        }));

        return {
          status: false,
          message: 'Validasi gagal',
          data: errorMessages,
        };
      }
      return {
        status: false,
        message: e.message || 'Terjadi kesalahan',
        data: null,
      };
    }
  }


  async create(token: string, data: FeedbackDTO) {
    const schema = z.object({
      content: z.string().min(1),
    });
    try {
      const validatedData = schema.parse(data);
      const extracttoken = jwt.verify(token, process.env.JWT_SECRET);
      if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
        var userId = extracttoken.userId;
      }
      const create = await this.prisma.feedback.create({
        data  : {
          user: {
            connect : {
              id : userId
            }
          },
          content: validatedData.content,
        },
        include : {
          user: true
        }
      })

      return {
        status: true,
        message: 'Success to create data',
        data: create,
      };

    } catch (e: any) {
      if (e instanceof ZodError) {
        const errorMessages = e.errors.map((error) => ({
          field: error.path.join('.'),
          message: error.message,
        }));

        return {
          status: false,
          message: 'Validasi gagal',
          data: errorMessages,
        };
      }
      return {
        status: false,
        message: e.message || 'Terjadi kesalahan',
        data: null,
      };
    }
}

}
