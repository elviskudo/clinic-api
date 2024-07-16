import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ZodError, z } from 'zod';
import { FeeDto } from 'src/dto/fee/fee.dto';
import { UpdateFeeDto } from 'src/dto/fee/update.fee.dto';

@Injectable()
export class FeeService {
  constructor(private prisma: PrismaService) {}

  async createFee(feeDto: FeeDto) {
    const schema = z.object({
      activities: z.string().min(1),
      cost: z.number().int().positive(),
      clinic_id: z.string().uuid(),
    });

    try {
      const validatedData = schema.parse(feeDto);
      const create = await this.prisma.fee.create({
        data: {
          activities: validatedData.activities,
          cost: validatedData.cost,
          clinic: {
            connect: {
              id: validatedData.clinic_id,
            },
          },
        },
        include: {
          clinic: true,
        },
      });

      return create;
    } catch (e: any) {
      if (e instanceof ZodError) {
        const errorMessages = e.errors.map((error) => ({
          field: error.path.join('.'),
          message: error.message,
        }));

        throw new BadRequestException({
          status: false,
          message: 'Validasi gagal',
          errors: errorMessages,
        });
      }
      throw new BadRequestException(e.message || 'Terjadi kesalahan');
    }
  }

  async updateFee(id: string, updateFeeDto: UpdateFeeDto) {
    const schema = z.object({
      activities: z.string().min(1),
      cost: z.number().int().positive(),
      clinic_id: z.string().uuid(),
    });

    try {
      const validatedData = schema.parse(updateFeeDto);
      const update = await this.prisma.fee.update({
        where: { id },
        data: {
          activities: validatedData.activities,
          cost: validatedData.cost,
          clinic: {
            connect: {
              id: validatedData.clinic_id,
            },
          },
        },
        include: {
          clinic: true,
        },
      });

      return update;
    } catch (e: any) {
      if (e instanceof ZodError) {
        const errorMessages = e.errors.map((error) => ({
          field: error.path.join('.'),
          message: error.message,
        }));

        throw new BadRequestException({
          status: false,
          message: 'Validasi gagal',
          errors: errorMessages,
        });
      }
      throw new BadRequestException(e.message || 'Terjadi kesalahan');
    }
  }

  async findOne(id: string) {
    return await this.prisma.fee.findUnique({
      where: { id },
      include: { clinic: true },
    });
  }

  async findAll() {
    return await this.prisma.fee.findMany({
      include: { clinic: true },
    });
  }

  async removefee(id: string) {
    return this.prisma.fee.delete({
      where: { id },
    });
  }
}
