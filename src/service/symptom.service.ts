import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SymptomDto } from 'src/dto/symptom/symptom.dto';
import { UpdateSymptomDto } from 'src/dto/symptom/update.symptom.dto';
import { PrismaService } from 'src/prisma.service';
import { Repository } from 'typeorm';
import { ZodError, z } from 'zod';

@Injectable()
export class SymptomService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async createSymptom(symptomDto) {
    const schema = z.object({
      name: z.string().min(1),
      description: z.string().min(1),
      poly_id: z.string().min(1),
    });

    try {
      const validatedData = schema.parse(symptomDto);
      const create = await this.prisma.symptom.create({
        data  : {
          name: validatedData.name,
          description: validatedData.description,
          poly: {
            connect: {
              id: validatedData.poly_id,
            },
          },
        },
        include : {
          poly: {
            include: {
              clinic: {
                include: {
                  city: true
                }
              }
            }
          }
        }
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

  async updateSymptom(
    id: string,
    updateSymptomDto: UpdateSymptomDto,
  ) {
    const schema = z.object({
      name: z.string().min(1),
      description: z.string().min(1),
      poly_id: z.string().min(1),
    });

    try {
      const validatedData = schema.parse(updateSymptomDto);
      const update = await this.prisma.symptom.update({
        where: {id : id},
        data  : {
          name: validatedData.name,
          description: validatedData.description,
          poly: {
            connect: {
              id: validatedData.poly_id,
            },
          },
        },
        include : {
          poly: {
            include: {
              clinic: {
                include: {
                  city: true
                }
              }
            }
          }
        }
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

  async findOne(id: string) {
    return await this.prisma.symptom.findUnique({
      where: {id : id},
      include : {
        poly: {
          include: {
            clinic: {
              include: {
                city: true
              }
            }
          }
        }
      }
    });
  }

  async findAll() {
    return await this.prisma.symptom.findMany({
      include : {
        poly: {
          include: {
            clinic: {
              include: {
                city: true
              }
            }
          }
        }
      }
    });
  }

  async removeSymptom(id: string) {
    return await this.prisma.symptom.delete({
      where: {id : id},
    });
  }
}
