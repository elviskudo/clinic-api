import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PolyDto } from 'src/dto/clinic/poly.dto';
import { UpdatePolyDto } from 'src/dto/clinic/update.poly.dto';
import { PrismaService } from 'src/prisma.service';
import { ZodError, z } from 'zod';

@Injectable()
export class PolyService {
  constructor(private prisma: PrismaService) {}

  async createPoly(polyDto) {
    const schema = z.object({
      name: z.string().min(1),
      description: z.string().min(1),
      clinic_id: z.string().min(1),
    });

    try {
      const validatedData = schema.parse(polyDto);
      const create = await this.prisma.poly.create({
        data: {
          name: validatedData.name,
          description: validatedData.description,
          clinic: {
            connect: {
              id: validatedData.clinic_id,
            },
          },
        },
        include: {
          clinic: {
            include: {
              city: true,
            },
          },
        },
      });

      const serializedResult = {
        ...create,
        clinic: {
          ...create.clinic,
          city_id: Number(create.clinic.city_id),
          city: {
            ...create.clinic.city,
            id: Number(create.clinic.city.id),
          },
        },
      };

      return {
        status: true,
        message: 'Success',
        data: serializedResult,
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
          users: null,
          token: null,
        };
      }
      return {
        status: false,
        message: e.message || 'Terjadi kesalahan',
        users: null,
        token: null,
      };
    }
  }

  async updatePoly(id: string, updatePolyDto: UpdatePolyDto) {
    const schema = z.object({
      name: z.string().min(1),
      description: z.string().min(1),
      clinic_id: z.string().min(1),
    });

    try {
      const validatedData = schema.parse(updatePolyDto);
      const update = await this.prisma.poly.update({
        where: { id: id },
        data: {
          name: validatedData.name,
          description: validatedData.description,
          clinic: {
            connect: {
              id: validatedData.clinic_id,
            },
          },
        },
        include: {
          clinic: {
            include: {
              city: true,
            },
          },
        },
      });

      const serializedResult = {
        ...update,
        clinic: {
          ...update.clinic,
          city_id: Number(update.clinic.city_id),
          city: {
            ...update.clinic.city,
            id: Number(update.clinic.city.id),
          },
        },
      };

      return {
        status: true,
        message: 'Success',
        data: serializedResult,
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
          users: null,
          token: null,
        };
      }
      return {
        status: false,
        message: e.message || 'Terjadi kesalahan',
        users: null,
        token: null,
      };
    }
  }

  async findOne(id: string) {
    const get = await this.prisma.poly.findUnique({
      where: { id: id },
      include: {
        clinic: {
          include: {
            city: true,
          },
        },
      },
    });

    const serializedResult = {
      ...get,
      clinic: {
        ...get.clinic,
        city_id: Number(get.clinic.city_id),
        city: {
          ...get.clinic.city,
          id: Number(get.clinic.city.id),
        },
      },
    };

    return serializedResult
  }

  async findAll() {
    const getall =  await this.prisma.poly.findMany({
      include: {
        clinic: {
          include: {
            city: true,
          },
        },
      },
    });

    const result = getall.map((poly) => ({
      ...poly,
      clinic: {
        ...poly.clinic,
        city_id: Number(poly.clinic.city_id),
        city: {
          ...poly.clinic.city,
          id: Number(poly.clinic.city.id),
        },
      },
    }));

    return result
  }

  async removePoly(id: string) {
    return await this.prisma.poly.delete({
      where: {
        id: id,
      },
    });
  }
}
