import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClinicDto } from 'src/dto/clinic/clinic.dto';
import { UpdateClinicDto } from 'src/dto/clinic/update.clinic.dto';
import { PrismaService } from 'src/prisma.service';
import { Repository } from 'typeorm';
import { ZodError, z } from 'zod';

@Injectable()
export class ClinicService {
  constructor(private prisma: PrismaService) {}

  async createClinic(clinicDto) {
    const schema = z.object({
      clinic_name: z.string().min(1),
      description: z.string().min(1),
      address: z.string().min(1),
      post_code: z.string().min(1),
      latitude: z.number().int().min(1),
      longitude: z.number().int().min(1),
      city_id: z.bigint(),
    });

    try {
      const validatedData = schema.parse(clinicDto);
      const create = await this.prisma.clinic.create({
        data: {
          clinic_name: validatedData.clinic_name,
          description: validatedData.description,
          address: validatedData.address,
          post_code: validatedData.post_code,
          latitude: validatedData.latitude,
          longitude: validatedData.longitude,
          city: {
            connect: {
              id: validatedData.city_id,
            },
          },
        },
        include: {
          city: true,
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

  async updateClinic(id: string, updateClinicDto: UpdateClinicDto) {
    const schema = z.object({
      clinic_name: z.string().min(1),
      description: z.string().min(1),
      address: z.string().min(1),
      post_code: z.string().min(1),
      latitude: z.number().int().min(1),
      longitude: z.number().int().min(1),
      city_id: z.bigint(),
    });

    try {
      const validatedData = schema.parse(updateClinicDto);
      const update = await this.prisma.clinic.update({
        where: { id: id },
        data: {
          clinic_name: validatedData.clinic_name,
          description: validatedData.description,
          address: validatedData.address,
          post_code: validatedData.post_code,
          latitude: validatedData.latitude,
          longitude: validatedData.longitude,
          city: {
            connect: {
              id: validatedData.city_id,
            },
          },
        },
        include: {
          city: true,
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
    return await this.prisma.clinic.findUnique({
      where: {
        id: id,
      },
      include: {
        city: true,
      },
    });
  }

  async findAll() {
    return await this.prisma.clinic.findMany({
      include: {
        city: true,
      },
    });
  }

  async removeClinic(id: string) {
    return await this.prisma.clinic.delete({
      where: {
        id: id,
      },
    });
  }
}
