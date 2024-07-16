import { Injectable, HttpException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { DrugDto } from 'src/dto/drug/drug.dto';
import { UpdateDrugDto } from 'src/dto/drug/update.drug.dto';
import { format_json } from 'src/env';
import { ZodError, z } from 'zod';

@Injectable()
export class DrugService {
  constructor(private prisma: PrismaService) {}

  private async findDrugByNameAndCompany(
    drug_name: string,
    company_name: string,
  ): Promise<any | null> {
    return this.prisma.drug.findFirst({
      where: { drug_name, company_name },
      include: {
        category: true,
        redeem: {
          include: {
            bank: {
              include: {
                bank_category: true,
              },
            },
            user: true,
          },
        },
      },
    });
  }

  async createDrug(drugDto: DrugDto): Promise<any> {
    const schema = z.object({
      drug_name: z.string().min(1),
      stock: z.number().int().nonnegative(),
      drug_summary: z.string().min(1),
      buy_price: z.number().int().min(1),
      sell_price: z.number().int().min(1),
      image_url: z.string().url().optional(),
      company_name: z.string().min(1),
      category_id: z.string().min(1),
      redeem_id: z.string().min(1),
    });

    try {
      const validatedData = schema.parse(drugDto);

      const existingDrug = await this.findDrugByNameAndCompany(
        validatedData.drug_name,
        validatedData.company_name,
      );

      if (existingDrug) {
        throw new HttpException(
          format_json(
            400,
            false,
            'Bad Request',
            null,
            'Drug with this name and company already exists',
            null,
          ),
          400,
        );
      }

      const create = await this.prisma.drug.create({
        data: {
          drug_name: validatedData.drug_name,
          stock: validatedData.stock,
          drug_summary: validatedData.drug_summary,
          buy_price: validatedData.buy_price,
          sell_price: validatedData.sell_price,
          image_url: validatedData.image_url,
          company_name: validatedData.company_name,
          category: {
            connect: {
              id: validatedData.category_id,
            },
          },
          redeem: {
            connect: {
              id: validatedData.redeem_id,
            },
          },
        },
        include: {
          category: true,
          redeem: {
            include: {
              bank: {
                include: {
                  bank_category: true,
                },
              },
              user: true,
            },
          },
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

  async updateDrug(id: string, updateDrugDto: UpdateDrugDto): Promise<any> {
    const schema = z.object({
      drug_name: z.string().min(1),
      stock: z.number().int().nonnegative(),
      drug_summary: z.string().min(1),
      buy_price: z.number().int().min(1),
      sell_price: z.number().int().min(1),
      image_url: z.string().url().optional(),
      company_name: z.string().min(1),
      category_id: z.string().min(1),
      redeem_id: z.string().min(1),
    });

    try {
      const validatedData = schema.parse(updateDrugDto);
      const update = await this.prisma.drug.update({
        where: { id: id },
        data: {
          drug_name: validatedData.drug_name,
          stock: validatedData.stock,
          drug_summary: validatedData.drug_summary,
          buy_price: validatedData.buy_price,
          sell_price: validatedData.sell_price,
          image_url: validatedData.image_url,
          company_name: validatedData.company_name,
          category: {
            connect: {
              id: validatedData.category_id,
            },
          },
          redeem: {
            connect: {
              id: validatedData.redeem_id,
            },
          },
        },
        include: {
          category: true,
          redeem: {
            include: {
              bank: {
                include: {
                  bank_category: true,
                },
              },
              user: true,
            },
          },
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

  async findOne(id: string): Promise<any> {
    return this.prisma.drug.findUnique({
      where: { id: id },
      include: {
        category: true,
        redeem: {
          include: {
            bank: {
              include: {
                bank_category: true,
              },
            },
            user: true,
          },
        },
      },
    });
  }

  async findAll(): Promise<any[]> {
    return this.prisma.drug.findMany({
      include: {
        category: true,
        redeem: {
          include: {
            bank: {
              include: {
                bank_category: true,
              },
            },
            user: true,
          },
        },
      },
    });
  }

  async removeDrug(id: string): Promise<void> {
    try {
      await this.prisma.drug.delete({
        where: { id: id },
      });
    } catch (e: any) {
      throw new HttpException(
        format_json(404, false, 'Not Found', null, 'Drug not found', null),
        404,
      );
    }
  }
}
