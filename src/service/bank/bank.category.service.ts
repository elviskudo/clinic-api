import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { z, ZodError } from 'zod';

@Injectable()
export class BankCategoryService {
  constructor(private prisma: PrismaService) {}

  async createBankCategory(bankCategoryDto: any) {
    const schema = z.object({
      category_name: z
        .string()
        .max(32)
        .min(1, { message: 'should not be empty' }),
      description: z.string().optional(),
    });

    try {
      const validatedData = schema.parse(bankCategoryDto);
      const create = this.prisma.bankCategory.create({
        data: {
          category_name: validatedData.category_name,
          description: validatedData.description,
        },
      });

      return create;
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

  async updateBankCategory(id: string, updateBankCategoryDto: any) {
    const schema = z.object({
      category_name: z
        .string()
        .max(32)
        .min(1, { message: 'should not be empty' })
        .optional(),
      description: z.string().optional(),
    });

    try {
      const validatedData = schema.parse(updateBankCategoryDto);
      const update = this.prisma.bankCategory.update({
        where: { id: id },
        data: {
          category_name: validatedData.category_name,
          description: validatedData.description,
        },
      });

      return update;
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
    return await this.prisma.bankCategory.findUnique({
      where: { id: id },
    });
  }

  async findAll() {
    return await this.prisma.bankCategory.findMany();
  }

  async removeBankCategory(id: string) {
    return this.prisma.bankCategory.delete({
      where: { id: id },
    });
  }
}
