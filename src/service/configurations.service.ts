import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { configurationsDTO } from 'src/dto/configurations.dto';
import { PrismaService } from 'src/prisma.service';
import { ZodError, z } from 'zod';

@Injectable()
export class configurationsService {
  constructor(
    private prisma: PrismaService
  ) {}

  async getdata(token: string) {
    try {
      const find = await this.prisma.configuration.findFirst({})

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


  async update(token: string, data: configurationsDTO) {
    const schema = z.object({
      application_name: z.string().min(1),
      application_version: z.string().min(1),
      application_content: z.string().min(1),
      application_teams: z.string().min(1),
      by_email: z.string().min(1),
      by_email_username: z.string().min(1),
      by_email_password: z.string().min(1),
      to_email: z.string().min(1),
      by_whatsapp: z.string().min(1),
      by_whatsapp_secret: z.string().min(1),
      by_telegram: z.string().min(1),
      by_telegram_secret: z.string().min(1),
    });
    try {
      const validatedData = schema.parse(data);
      const extracttoken = jwt.verify(token, process.env.JWT_SECRET);
      if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
        var userId = extracttoken.userId;
      }

      const find = await this.prisma.configuration.findFirst({})

      const update = await this.prisma.configuration.update({
        where: { id : find.id},
        data  : {
          application_name: validatedData.application_name,
          application_version: validatedData.application_version,
          application_content: validatedData.application_content,
          application_teams:validatedData.application_teams,
          by_email: validatedData.by_email,
          by_email_username: validatedData.by_email_username,
          by_email_password: validatedData.by_email_password,
          to_email: validatedData.to_email,
          by_whatsapp: validatedData.by_whatsapp,
          by_whatsapp_secret: validatedData.by_whatsapp_secret,
          by_telegram: validatedData.by_telegram,
          by_telegram_secret: validatedData.by_telegram_secret,
        }
      })

      return {
        status: true,
        message: 'Success to update data',
        data: update,
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
