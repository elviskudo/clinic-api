import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PrismaService } from 'src/prisma.service';
import { Repository } from 'typeorm';
import { ZodError, z } from 'zod';

@Injectable()
export class RoleService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async findAll() {
    return await this.prisma.role.findMany();
  }

  async findById(id: string) {
    return await this.prisma.role.findUnique({
      where: {id : id}
    });
  }

  async create(role) {
    const schema = z.object({
      name: z.string().min(1),
      description: z.string().min(1),
    });

    try {
      const validatedData = schema.parse(role);
      const create = await this.prisma.role.create({
        data  : {
          name: validatedData.name,
          description: validatedData.description
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

  async update(id: string, role) {
    const schema = z.object({
      name: z.string().min(1),
      description: z.string().min(1),
    });

    try {
      const validatedData = schema.parse(role);
      const update = await this.prisma.role.update({
        where: { id: id },
        data  : {
          name: validatedData.name,
          description: validatedData.description
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

  async delete(id: string) {
    return await this.prisma.role.delete({
      where: {
        id: id,
      },
    });
  }
}
