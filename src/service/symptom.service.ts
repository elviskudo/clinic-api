import { Injectable } from '@nestjs/common';
import { ZodError, z } from 'zod';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SymptomService {
  constructor(private prisma: PrismaService) {}

  async createSymptom(symptomDto) {
    const schema = z.object({
      name: z.string().min(1),
      description: z.string().min(1),
      poly_id: z.string().min(1),
    });

    try {
      const validatedData = schema.parse(symptomDto);

      const create = await this.prisma.symptom.create({
        data: {
          name: validatedData.name,
          description: validatedData.description,
          poly: {
            connect: {
              id: validatedData.poly_id,
            },
          },
        },
        include: {
          poly: {
            include: {
              clinic: {
                include: {
                  city: true,
                },
              },
            },
          },
        },
      });

      const serializedResult = {
        ...create,
        poly: {
          clinic: {
            ...create.poly.clinic,
            city_id: Number(create.poly.clinic.city_id),
            city: {
              ...create.poly.clinic.city,
              id: Number(create.poly.clinic.city.id),
            },
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
        };
      }
      return {
        status: false,
        message: e.message || 'Terjadi kesalahan',
      };
    }
  }

  async updateSymptom(id: string, updateSymptomDto) {
    const schema = z.object({
      name: z.string().min(1),
      description: z.string().min(1),
      poly_id: z.string().min(1),
    });

    try {
      const validatedData = schema.parse(updateSymptomDto);

      const update = await this.prisma.symptom.update({
        where: { id: id },
        data: {
          name: validatedData.name,
          description: validatedData.description,
          poly: {
            connect: {
              id: validatedData.poly_id,
            },
          },
        },
        include: {
          poly: {
            include: {
              clinic: {
                include: {
                  city: true,
                },
              },
            },
          },
        },
      });

      const serializedResult = {
        ...update,
        poly: {
          clinic: {
            ...update.poly.clinic,
            city_id: Number(update.poly.clinic.city_id),
            city: {
              ...update.poly.clinic.city,
              id: Number(update.poly.clinic.city.id),
            },
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
        };
      }
      return {
        status: false,
        message: e.message || 'Terjadi kesalahan',
      };
    }
  }

  async findOne(id: string) {
    const get = await this.prisma.symptom.findUnique({
      where: { id: id },
      include: {
        poly: {
          include: {
            clinic: {
              include: {
                city: true,
              },
            },
          },
        },
      },
    });

    const serializedResult = {
      ...get,
      poly: {
        clinic: {
          ...get.poly.clinic,
          city_id: Number(get.poly.clinic.city_id),
          city: {
            ...get.poly.clinic.city,
            id: Number(get.poly.clinic.city.id),
          },
        },
      },
    };

    return serializedResult;
  }

  async findAll() {
    const symptoms = await this.prisma.symptom.findMany({
      include: {
        poly: {
          include: {
            clinic: {
              include: {
                city: true,
              },
            },
          },
        },
      },
    });

    const result = symptoms.map((symptom) => ({
      ...symptom,
      poly: {
        clinic: {
          ...symptom.poly.clinic,
          city_id: Number(symptom.poly.clinic.city_id),
          city: {
            ...symptom.poly.clinic.city,
            id: Number(symptom.poly.clinic.city.id),
          },
        },
      },
    }));

    return result;
  }

  async removeSymptom(id: string) {
    return await this.prisma.symptom.delete({
      where: { id: id },
    });
  }
}
