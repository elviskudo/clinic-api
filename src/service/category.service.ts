import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryDto } from 'src/dto/category/category.dto';
import { UpdateCategoryDto } from 'src/dto/category/update.category.dto';
import { PrismaService } from 'src/prisma.service';
import { Repository } from 'typeorm';
import { ZodError, z } from 'zod';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async createCategory(categoryDto: CategoryDto) {
    const schema = z.object({
      category_name: z.string().min(1),
      description: z.string().min(1),
    });

    try {
      const validatedData = schema.parse(categoryDto);
      const create = await this.prisma.drugCategory.create({
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

        return errorMessages;
      }
      return e.message || 'Terjadi kesalahan';
    }
  }

  async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto) {
    const schema = z.object({
      category_name: z.string().min(1),
      description: z.string().min(1),
    });

    try {
      const validatedData = schema.parse(updateCategoryDto);
      const update = await this.prisma.drugCategory.update({
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

        return errorMessages;
      }
      return e.message || 'Terjadi kesalahan';
    }
  }

  async findAll() {
    return await this.prisma.drugCategory.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.drugCategory.findUnique({
      where: { id: id },
    });
  }

  async removeCategory(id: string) {
    return await this.prisma.drugCategory.delete({
      where: {
        id: id,
      },
    });
  }
}
