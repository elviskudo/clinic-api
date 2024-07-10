import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as jwt from 'jsonwebtoken';
import { ZodError, z } from 'zod';
import { DiagnosisDTO } from 'src/dto/diagnosis.dto';

@Injectable()
export class DiagnosisService {
  constructor(private prisma: PrismaService) {}

  async getdata(token: string) {
    const extracttoken = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
      const userId = extracttoken.userId;

      const diagnosis = await this.prisma.diagnosis.findMany({
        where: { user_id: userId },
        include: {
          user: true,
        },
      });

      if (diagnosis.length > 0) {
        const result = diagnosis.map((diagnosis) => ({
          user_id: diagnosis.user_id,
          user: diagnosis.user,
          deaseas_name: diagnosis.deaseas_name,
        }));

        return {
          status: true,
          message: 'Success to get data',
          data: result,
        };
      } else {
        return {
          status: false,
          message: 'No diagnosis records found for this user',
          data: null,
        };
      }
    } else {
      return {
        status: false,
        message: 'Invalid token',
        data: null,
      };
    }
  }

  async create(token: string, data: DiagnosisDTO) {
    const schema = z.object({
      deaseas_name: z.string().min(1),
    });

    try {
      const validatedData = schema.parse(data);
      const extracttoken = jwt.verify(token, process.env.JWT_SECRET);
      if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
        const userId = extracttoken.userId;

        const create = await this.prisma.diagnosis.create({
          data: {
            user_id: userId,
            deaseas_name: validatedData.deaseas_name,
          },
          include: {
            user: true,
          },
        });

        return {
          status: true,
          message: 'Data successfully created',
          data: create,
        };
      } else {
        return {
          status: false,
          message: 'Invalid token',
          data: null,
        };
      }
    } catch (e: any) {
      if (e instanceof ZodError) {
        const errorMessages = e.errors.map((error) => ({
          field: error.path.join('.'),
          message: error.message,
        }));

        return {
          status: false,
          message: 'Validasi gagal',
          errors: errorMessages,
        };
      }
      return {
        status: false,
        message: e.message || 'Terjadi kesalahan',
      };
    }
  }

  async update(token: string, id: string, data: DiagnosisDTO) {
    const schema = z.object({
      deaseas_name: z.string().min(1),
    });

    try {
      const validatedData = schema.parse(data);
      const extracttoken = jwt.verify(token, process.env.JWT_SECRET);

      if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
        const userId = extracttoken.userId;

        const diagnosis = await this.prisma.diagnosis.findUnique({
          where: { id: id },
          include: {
            user: true,
          },
        });

        if (!diagnosis) {
          return {
            status: false,
            message: 'Diagnosis not found',
            data: null,
          };
        }

        const update = await this.prisma.diagnosis.update({
          where: { id: id },
          data: {
            deaseas_name: validatedData.deaseas_name,
          },
          include: {
            user: true,
          },
        });

        return {
          status: true,
          message: 'Data successfully updated',
          data: update,
        };
      } else {
        return {
          status: false,
          message: 'Invalid token',
          data: null,
        };
      }
    } catch (e: any) {
      if (e instanceof ZodError) {
        const errorMessages = e.errors.map((error) => ({
          field: error.path.join('.'),
          message: error.message,
        }));

        return {
          status: false,
          message: 'Validasi gagal',
          errors: errorMessages,
        };
      }
      return {
        status: false,
        message: e.message || 'Terjadi kesalahan',
      };
    }
  }

  async delete(token: string, id: string) {
    try {
      const extracttoken = jwt.verify(token, process.env.JWT_SECRET);
      if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
        const userId = extracttoken.userId;

        const deleteResult = await this.prisma.diagnosis.delete({
          where: { id: id },
        });

        return {
          status: true,
          message: 'Data successfully deleted',
          data: deleteResult,
        };
      } else {
        return {
          status: false,
          message: 'Invalid token',
          data: null,
        };
      }
    } catch (error: any) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((error) => ({
          field: error.path.join('.'),
          message: error.message,
        }));

        return {
          status: false,
          message: 'Validasi gagal',
          errors: errorMessages,
        };
      }

      if (error instanceof Error) {
        return {
          status: false,
          message: error.message || 'Terjadi kesalahan',
          data: null,
        };
      }

      return {
        status: false,
        message: 'Terjadi kesalahan yang tidak diketahui',
        data: null,
      };
    }
  }
}
