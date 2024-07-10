import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TermCategoryDto } from 'src/dto/term/term.category.dto';
import { UpdateTermCategoryDto } from 'src/dto/term/update.term.category.dto';
import { ZodError, z } from 'zod';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TermCategoryService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async createTermCategory(
    termCategoryDto: TermCategoryDto,
  ) {
    const schema = z.object({
      name: z.string().min(1),
    });

    try {
      const validatedData = schema.parse(termCategoryDto);
      const create = await this.prisma.termCategory.create({
        data  : {
          name: validatedData.name,
          },
        })

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

  async updateTermCategory(
    id: string,
    updateTermCategoryDto: UpdateTermCategoryDto,
  ) {
    const schema = z.object({
      name: z.string().min(1),
    });

    try {
      const validatedData = schema.parse(updateTermCategoryDto);
      const update = await this.prisma.termCategory.update({
        where: { id: id },
        data  : {
          name: validatedData.name,
          },
        })

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
    return await this.prisma.termCategory.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.termCategory.findUnique({
      where: {id : id}
    });
  }

  async removeTermCategory(id: string) {
    return await this.prisma.termCategory.delete({
      where: {
        id: id,
      },
    });
  }
}
