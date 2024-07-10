import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import { LastMedicalRecordDto } from 'src/dto/latest/last.medical.record.dto';
import { PrismaService } from 'src/prisma.service';
import { ZodError, z } from 'zod';

@Injectable()
export class LastMedicalRecordService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async getLastMedicalRecord(token: string) {
    try {

      const extracttoken = jwt.verify(token, process.env.JWT_SECRET);

      if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
        var userId = extracttoken.userId;
      }


      const find = await this.prisma.record.findMany({
        include: {
          user : true,
          poly: {
            include: {
              clinic: true
            }
          },
          doctor: {
            include: {
              poly : {
                include: {
                  clinic: true
                }
              },
              city: true,
            }
          },
          clinic: {
            include: {
              city: true
            }
          },
        }
      })

      return {
        status: true,
        message: 'Success',
        data: find,
      };

    } catch (e: any) {
      if (e instanceof ZodError) {
        const errorMessages = e.errors.map((error) => ({
          field: error.path.join('.'),
          message: error.message,
        }));

        return {
          status: false,
          message: 'Sistem Error',
          data: errorMessages,
        };
      }
      return {
        status: false,
        message: 'Sistem Error',
        data: e.message,
      };
    }
  }

  async createLastMedicalRecord(
    token: string,
    createLastMedicalRecordDto: LastMedicalRecordDto,
  ) {
    const schema = z.object({
      consultation_date_time: z.date(),
      way_to_come: z.string().min(1),
      vistting_time: z.string().min(1),
      transportation: z.string().min(1),
      reference: z.string().min(1),
      person_responsible: z.string().min(1),
      traumatic: z.string().min(1),
      non_traumatic: z.string().min(1),
      conditions: z.string().min(1),
      complaint: z.string().min(1),
      history_of_illness: z.string().min(1),
      solution: z.string().min(1),
      doctor_id: z.string().min(1),
      poly_id: z.string().min(1),
      clinic_id: z.string().min(1),
    });
    try {
      const validatedData = schema.parse(createLastMedicalRecordDto);
      const extracttoken = jwt.verify(token, process.env.JWT_SECRET);

      if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
        var userId = extracttoken.userId;
      }


      const save = await this.prisma.record.create({
        data: {
          consultation_date_time: validatedData.consultation_date_time,
          way_to_come: validatedData.way_to_come,
          vistting_time: validatedData.vistting_time,
          transportation: validatedData.transportation,
          reference: validatedData.reference,
          person_responsible: validatedData.person_responsible,
          traumatic: validatedData.traumatic,
          non_traumatic: validatedData.non_traumatic,
          conditions: validatedData.conditions,
          complaint: validatedData.complaint,
          history_of_illness: validatedData.history_of_illness,
          solution: validatedData.solution,
          user : {
            connect : {
              id: userId
            }
          },
          doctor: {
            connect: {
              id: validatedData.doctor_id
            }
          },
          poly: {
            connect: {
              id: validatedData.poly_id
            }
          },
          clinic: {
            connect: {
              id: validatedData.clinic_id
            }
          },
        },
        include: {
          user : true,
          poly: {
            include: {
              clinic: true
            }
          },
          doctor: {
            include: {
              poly : {
                include: {
                  clinic: true
                }
              },
              city: true,
            }
          },
          clinic: {
            include: {
              city: true
            }
          },
        }
      })
      
      return {
        status: true,
        message: 'Success',
        data: save,
      };

    } catch (e: any) {
      if (e instanceof ZodError) {
        const errorMessages = e.errors.map((error) => ({
          field: error.path.join('.'),
          message: error.message,
        }));

        return {
          status: false,
          message: 'Sistem Error',
          data: errorMessages,
        };
      }
      return {
        status: false,
        message: 'Sistem Error',
        data: e.message,
      };
    }
  }
}
