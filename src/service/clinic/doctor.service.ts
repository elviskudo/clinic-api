import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorDto } from 'src/dto/clinic/doctor.dto';
import { UpdateDoctorDto } from 'src/dto/clinic/update.doctor.dto';
import { Like, Repository } from 'typeorm';
import { PolyService } from './poly.service';
import { WilayahService } from '../location/location.service';
import { ZodError, z } from 'zod';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class DoctorService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async createDoctor(doctorDto) {
    const schema = z.object({
      doctor_name: z.string().min(1),
      place_of_birth: z.string().min(1),
      date_of_birth: z.string().date(),
      specialist: z.string().min(1),
      bio: z.string().min(1),
      graduate_of: z.string().min(1),
      description: z.string().min(1),
      address: z.string().min(1),
      post_code: z.string().min(1),
      latitude: z.number().int().min(1),
      longitude: z.number().int().min(1),
      title : z.string().min(1),
      experience : z.string().min(1),
      education : z.string().min(1),
      poly_id : z.string().min(1),
      wilayah_id : z.bigint(),
    });

    try {
      const validatedData = schema.parse(doctorDto);
      const create = await this.prisma.doctor.create({
        data  : {
          doctor_name: validatedData.doctor_name,
          place_of_birth: validatedData.place_of_birth,
          date_of_birth: validatedData.date_of_birth,
          specialist: validatedData.specialist,
          bio: validatedData.bio,
          graduate_of: validatedData.graduate_of,
          description: validatedData.description,
          address: validatedData.address,
          post_code: validatedData.post_code,
          latitude: validatedData.latitude,
          longitude: validatedData.longitude,
          title : validatedData.title,
          experience : validatedData.experience,
          education : validatedData.education,
          poly : {
            connect : {
              id: validatedData.poly_id
            }
          },
          city : {
            connect : {
              id: validatedData.wilayah_id
            }
          },
        },
        include: {
          poly: {
            include: {
              clinic: true,
            },
          },
          city: true,
        },
      })

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

  async updateDoctor(
    id: string,
    updateDoctorDto: UpdateDoctorDto,
  ) {
    const schema = z.object({
      doctor_name: z.string().min(1),
      place_of_birth: z.string().min(1),
      date_of_birth: z.string().date(),
      specialist: z.string().min(1),
      bio: z.string().min(1),
      graduate_of: z.string().min(1),
      description: z.string().min(1),
      address: z.string().min(1),
      post_code: z.string().min(1),
      latitude: z.number().int().min(1),
      longitude: z.number().int().min(1),
      title : z.string().min(1),
      experience : z.string().min(1),
      education : z.string().min(1),
      poly_id : z.string().min(1),
      wilayah_id : z.bigint(),
    });

    try {
      const validatedData = schema.parse(updateDoctorDto);
      const update = await this.prisma.doctor.update({
        where: { id: id },
        data  : {
          doctor_name: validatedData.doctor_name,
          place_of_birth: validatedData.place_of_birth,
          date_of_birth: validatedData.date_of_birth,
          specialist: validatedData.specialist,
          bio: validatedData.bio,
          graduate_of: validatedData.graduate_of,
          description: validatedData.description,
          address: validatedData.address,
          post_code: validatedData.post_code,
          latitude: validatedData.latitude,
          longitude: validatedData.longitude,
          title : validatedData.title,
          experience : validatedData.experience,
          education : validatedData.education,
          poly : {
            connect : {
              id: validatedData.poly_id
            }
          },
          city : {
            connect : {
              id: validatedData.wilayah_id
            }
          },
        },
        include: {
          poly: {
            include: {
              clinic: true,
            },
          },
          city: true,
        },
      })

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
    return await this.prisma.doctor.findUnique({
      where: {
        id: id
      },
      include: {
        poly: {
          include: {
            clinic: true,
          },
        },
        city: true,
      },
    });
  }

  async findAll(
    query: string,
    page: number,
    limit: number,
    order: 'asc' | 'desc' = 'asc',
  ) {
    const skip = (page - 1) * limit;

    const whereClause = query
      ? {
          OR: [
            { doctor_name: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
            { address: { contains: query, mode: 'insensitive' } },
            { education: { contains: query, mode: 'insensitive' } },
          ],
        }
      : {};

      const doctors = await this.prisma.doctor.findMany({
        where: whereClause,
        take: limit || 10,
        skip: skip || 0,
        orderBy: {
          doctor_name: order,
        },
        include: {
          poly: {
            include: {
              clinic: true,
            },
          },
          city: true,
        },
      });

    return doctors;
  }

  async removeDoctor(id: string) {
    return await this.prisma.clinic.delete({
      where: {
        id: id,
      },
    });
  }
}
