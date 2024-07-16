import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { z, ZodError } from 'zod';

@Injectable()
export class BankService {
  constructor(private prisma: PrismaService) {}

  async createBank(bankDto: any) {
    const schema = z.object({
      bank_name: z.string().min(1),
      account_number: z.string().min(1),
      account_name: z.string().min(1),
      service_charge: z.number().int().optional(),
      handling_fee: z.number().int().optional(),
      bank_images: z.number().int().optional(),
      bank_category_id: z.string().uuid(),
    });

    try {
      const validatedData = schema.parse(bankDto);
      const create = await this.prisma.bank.create({
        data: {
          bank_name: validatedData.bank_name,
          account_number: validatedData.account_number,
          account_name: validatedData.account_name,
          service_charge: validatedData.service_charge,
          handling_fee: validatedData.handling_fee,
          bank_images: validatedData.bank_images,
          bank_category: {
            connect: {
              id: validatedData.bank_category_id,
            },
          },
        },
        include: {
          bank_category: true,
        },
      });

      return {
        status: true,
        message: 'Success',
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
          errors: errorMessages,
        };
      }
      return {
        status: false,
        message: e.message || 'Terjadi kesalahan',
      };
    }
  }

  async updateBank(id: string, updateBankDto: any) {
    const schema = z.object({
      bank_name: z.string().min(1).optional(),
      account_number: z.string().min(1).optional(),
      account_name: z.string().min(1).optional(),
      service_charge: z.number().int().optional(),
      handling_fee: z.number().int().optional(),
      bank_images: z.number().int().optional(),
      bank_category_id: z.string().uuid().optional(),
    });

    try {
      const validatedData = schema.parse(updateBankDto);
      const update = await this.prisma.bank.update({
        where: { id: id },
        data: {
          bank_name: validatedData.bank_name,
          account_number: validatedData.account_number,
          account_name: validatedData.account_name,
          service_charge: validatedData.service_charge,
          handling_fee: validatedData.handling_fee,
          bank_images: validatedData.bank_images,
          bank_category: validatedData.bank_category_id
            ? {
                connect: {
                  id: validatedData.bank_category_id,
                },
              }
            : undefined,
        },
        include: {
          bank_category: true,
        },
      });

      return {
        status: true,
        message: 'Success',
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
          errors: errorMessages,
        };
      }
      return {
        status: false,
        message: e.message || 'Terjadi kesalahan',
      };
    }
  }

  async findOne(id: string) {
    return await this.prisma.bank.findUnique({
      where: { id: id },
      include: {
        bank_category: true,
      },
    });
  }

  async findAll() {
    return await this.prisma.bank.findMany({
      include: {
        bank_category: true,
      },
    });
  }

  async removeBank(id: string) {
    return this.prisma.bank.delete({
      where: {
        id: id,
      },
    });
  }
}
