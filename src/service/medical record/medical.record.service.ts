import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ZodError, z } from 'zod';
import { MedicalRecordDto } from 'src/dto/medical record/medical.record.dto';

@Injectable()
export class MedicalRecordService {
  constructor(private prisma: PrismaService) {}

  async createRecord(medicalRecordDto: MedicalRecordDto) {
    const schema = z.object({
      consultation_date_time: z.string().datetime(),
      way_to_come: z.string().min(1),
      vistting_time: z.string().datetime(),
      transportation: z.string().min(1),
      reference: z.string().min(1),
      person_responsible: z.string().min(1),
      traumatic: z.string().min(1),
      non_traumatic: z.string().min(1),
      conditions: z.string().min(1),
      complaint: z.string().min(1),
      history_of_illness: z.string().min(1),
      solution: z.string().min(1),
      user_id: z.string().min(1),
      poly_id: z.string().min(1),
      clinic_id: z.string().min(1),
      doctor_id: z.string().min(1),
      wilayah_id: z.bigint().optional(),
    });

    try {
      const validatedData = schema.parse(medicalRecordDto);
      const create = await this.prisma.record.create({
        data: {
          consultation_date_time: new Date(
            validatedData.consultation_date_time,
          ),
          way_to_come: validatedData.way_to_come,
          vistting_time: new Date(validatedData.vistting_time),
          transportation: validatedData.transportation,
          reference: validatedData.reference,
          person_responsible: validatedData.person_responsible,
          traumatic: validatedData.traumatic,
          non_traumatic: validatedData.non_traumatic,
          conditions: validatedData.conditions,
          complaint: validatedData.complaint,
          history_of_illness: validatedData.history_of_illness,
          solution: validatedData.solution,
          user: {
            connect: {
              id: validatedData.user_id,
            },
          },
          poly: {
            connect: {
              id: validatedData.poly_id,
            },
          },
          clinic: {
            connect: {
              id: validatedData.clinic_id,
            },
          },
          doctor: {
            connect: {
              id: validatedData.doctor_id,
            },
          },
        },
        include: {
          poly: {
            include: {
              clinic: true,
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

  async updateRecord(id: string, medicalRecordDto: MedicalRecordDto) {
    const schema = z.object({
      consultation_date_time: z.string().datetime(),
      way_to_come: z.string().min(1),
      vistting_time: z.string().datetime(),
      transportation: z.string().min(1),
      reference: z.string().min(1),
      person_responsible: z.string().min(1),
      traumatic: z.string().min(1),
      non_traumatic: z.string().min(1),
      conditions: z.string().min(1),
      complaint: z.string().min(1),
      history_of_illness: z.string().min(1),
      solution: z.string().min(1),
      user_id: z.string().min(1),
      poly_id: z.string().min(1),
      clinic_id: z.string().min(1),
      doctor_id: z.string().min(1),
      wilayah_id: z.bigint().optional(),
    });

    try {
      const validatedData = schema.parse(medicalRecordDto);
      const update = await this.prisma.record.update({
        where: { id: id },
        data: {
          consultation_date_time: new Date(
            validatedData.consultation_date_time,
          ),
          way_to_come: validatedData.way_to_come,
          vistting_time: new Date(validatedData.vistting_time),
          transportation: validatedData.transportation,
          reference: validatedData.reference,
          person_responsible: validatedData.person_responsible,
          traumatic: validatedData.traumatic,
          non_traumatic: validatedData.non_traumatic,
          conditions: validatedData.conditions,
          complaint: validatedData.complaint,
          history_of_illness: validatedData.history_of_illness,
          solution: validatedData.solution,
          user: {
            connect: {
              id: validatedData.user_id,
            },
          },
          poly: {
            connect: {
              id: validatedData.poly_id,
            },
          },
          clinic: {
            connect: {
              id: validatedData.clinic_id,
            },
          },
          doctor: {
            connect: {
              id: validatedData.doctor_id,
            },
          },
        },
        include: {
          poly: {
            include: {
              clinic: true,
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

  async findOne(id: string) {
    return await this.prisma.record.findUnique({
      where: { id: id },
      include: {
        poly: {
          include: {
            clinic: true,
          },
        },
      },
    });
  }

  async findAll() {
    return await this.prisma.record.findMany({
      include: {
        poly: {
          include: {
            clinic: true,
          },
        },
      },
    });
  }

  async removeRecord(id: string) {
    return await this.prisma.record.delete({
      where: { id: id },
    });
  }
}
