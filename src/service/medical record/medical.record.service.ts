import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { MedicalRecordDto } from 'src/dto/medical record/medical.record.dto';
import { PrismaService } from 'src/prisma.service';
import { ZodError, z } from 'zod';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class MedicalRecordService {
  private readonly logger = new Logger(MedicalRecordService.name);

  constructor(private prisma: PrismaService) {}

  async createRecord(medicalRecordDto: MedicalRecordDto, token: string) {
    const schema = z.object({
      consultation_date_time: z.string().min(1),
      vistting_time: z.string().min(1),
      way_to_come: z.string().min(1),
      transportation: z.string().min(1),
      reference: z.string().min(1),
      person_responsible: z.string().min(1),
      traumatic: z.string().min(1),
      non_traumatic: z.string().min(1),
      conditions: z.string().min(1),
      complaint: z.string().min(1),
      history_of_illness: z.string().min(1),
      solution: z.string().min(1),
      poly_id: z.string().min(1),
      clinic_id: z.string().min(1),
      doctor_id: z.string().min(1),
      city_id: z.number().int().min(1),
    });

    try {
      const validatedData = schema.parse(medicalRecordDto);
      const extracttoken = jwt.verify(token, process.env.JWT_SECRET);
      if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
        var userId = extracttoken.userId;
      }

      const create = await this.prisma.record.create({
        data: {
          consultation_date_time: validatedData.consultation_date_time,
          vistting_time: validatedData.vistting_time,
          way_to_come: validatedData.way_to_come,
          transportation: validatedData.transportation,
          reference: validatedData.reference,
          person_responsible: validatedData.person_responsible,
          traumatic: validatedData.traumatic,
          non_traumatic: validatedData.non_traumatic,
          conditions: validatedData.conditions,
          complaint: validatedData.complaint,
          history_of_illness: validatedData.history_of_illness,
          solution: validatedData.solution,
          user: { connect: { id: userId } },
          poly: { connect: { id: validatedData.poly_id } },
          clinic: { connect: { id: validatedData.clinic_id } },
          doctor: { connect: { id: validatedData.doctor_id } },
          city: { connect: { id: validatedData.city_id } },
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
          city: true,
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
          data: errorMessages,
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
      consultation_date_time: z.string().min(1),
      vistting_time: z.string().min(1),
      way_to_come: z.string().min(1),
      transportation: z.string().min(1),
      reference: z.string().min(1),
      person_responsible: z.string().min(1),
      traumatic: z.string().min(1),
      non_traumatic: z.string().min(1),
      conditions: z.string().min(1),
      complaint: z.string().min(1),
      history_of_illness: z.string().min(1),
      solution: z.string().min(1),
      poly_id: z.string().min(1),
      clinic_id: z.string().min(1),
      doctor_id: z.string().min(1),
      city_id: z.number().int().min(1),
    });

    try {
      const validatedData = schema.parse(medicalRecordDto);
      const update = await this.prisma.record.update({
        where: { id: id },
        data: {
          consultation_date_time: validatedData.consultation_date_time,
          vistting_time: validatedData.vistting_time,
          way_to_come: validatedData.way_to_come,
          transportation: validatedData.transportation,
          reference: validatedData.reference,
          person_responsible: validatedData.person_responsible,
          traumatic: validatedData.traumatic,
          non_traumatic: validatedData.non_traumatic,
          conditions: validatedData.conditions,
          complaint: validatedData.complaint,
          history_of_illness: validatedData.history_of_illness,
          solution: validatedData.solution,
          poly: { connect: { id: validatedData.poly_id } },
          clinic: { connect: { id: validatedData.clinic_id } },
          doctor: { connect: { id: validatedData.doctor_id } },
          city: { connect: { id: validatedData.city_id } },
        },
        include: {
          poly: { include: { clinic: true } },
        },
      });

      return update;
    } catch (e: any) {
      this.logger.error('Error updating medical record', e);

      if (e instanceof ZodError) {
        const errorMessages = e.errors.map((error) => ({
          field: error.path.join('.'),
          message: error.message,
        }));

        throw new BadRequestException({
          status: 400,
          message: 'Validasi gagal',
          errors: errorMessages,
        });
      }
      throw new BadRequestException({
        status: 400,
        message: e.message || 'Terjadi kesalahan',
      });
    }
  }

  async findOne(id: string) {
    try {
      const record = await this.prisma.record.findUnique({
        where: { id: id },
        include: {
          poly: { include: { clinic: true } },
        },
      });
      if (!record) {
        throw new BadRequestException({
          status: 404,
          message: 'Medical record not found',
        });
      }
      return record;
    } catch (e: any) {
      this.logger.error('Error finding medical record', e);
      throw new BadRequestException({
        status: 400,
        message: e.message || 'Terjadi kesalahan',
      });
    }
  }

  async findAll() {
    try {
      return await this.prisma.record.findMany({
        include: {
          poly: { include: { clinic: true } },
        },
      });
    } catch (e: any) {
      this.logger.error('Error finding medical records', e);
      throw new BadRequestException({
        status: 400,
        message: e.message || 'Terjadi kesalahan',
      });
    }
  }

  async removeRecord(id: string) {
    try {
      const record = await this.findOne(id);
      if (!record) {
        throw new BadRequestException({
          status: 404,
          message: 'Medical record not found',
        });
      }
      return await this.prisma.record.delete({
        where: { id: id },
      });
    } catch (e: any) {
      this.logger.error('Error deleting medical record', e);
      throw new BadRequestException({
        status: 400,
        message: e.message || 'Terjadi kesalahan',
      });
    }
  }
}
