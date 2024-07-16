import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clinic } from '@prisma/client';
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
      city_id: z.number().int().min(1),
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

      const serializedResult = {
        ...create,
        city_id: Number(create.city_id),
        city: {
          ...create.city,
          id: Number(create.city.id),
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

  async updateClinic(id: string, updateClinicDto: UpdateClinicDto) {
    const schema = z.object({
      clinic_name: z.string().min(1),
      description: z.string().min(1),
      address: z.string().min(1),
      post_code: z.string().min(1),
      latitude: z.number().int().min(1),
      longitude: z.number().int().min(1),
      city_id: z.number().int().min(1),
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

      const serializedResult = {
        ...update,
        city_id: Number(update.city_id),
        city: {
          ...update.city,
          id: Number(update.city.id),
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
    const get = await this.prisma.clinic.findUnique({
      where: {
        id: id,
      },
      include: {
        city: true,
      },
    });

    const serializedResult = {
      ...get,
      city_id: Number(get.city_id),
      city: {
        ...get.city,
        id: Number(get.city.id),
      },
    };

    return serializedResult;
  }

  async findAll() {
    const clinics = await this.prisma.clinic.findMany({
      include: {
        city: true,
      },
    });

    const result = clinics.map((clinics) => ({
      ...clinics,
      city_id: Number(clinics.city_id),
      city: {
        ...clinics.city,
        id: Number(clinics.city.id),
      },
    }));

    return result;
  }

  async removeClinic(id: string) {
    return await this.prisma.clinic.delete({
      where: {
        id: id,
      },
    });
  }
}
