import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SummaryDto } from 'src/dto/summary/summary.dto';
import { UpdateSummaryDto } from 'src/dto/summary/update.summary.dto';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from 'src/prisma.service';
import { ZodError, z } from 'zod';

@Injectable()
export class SummaryService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async getappointments(token: string) {
    try {

      const extracttoken = jwt.verify(token, process.env.JWT_SECRET);

      if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
        var userId = extracttoken.userId;
      }


      const find = await this.prisma.summary.findMany({
        where: { patient_id : userId },
        include: {
          poly : true,
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
          patient: {
            include: {
              user: true
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
  
  async createSummary(token: string,summaryDto: SummaryDto) {
    const schema = z.object({
      poly_id: z.string().min(1),
      doctor_id: z.string().min(1),
      scheduled_date_time: z.date(),
      qr_code: z.string().min(1),
      image_captured_checked: z.boolean(),
      symptoms: z.string().min(1),
      symptoms_description: z.string().min(1),
      status: z.boolean(),
      ai_status: z.boolean(),
      ai_response: z.string(),
      image_url: z.string(),
      ai_token: z.string(),
      drug:  z.object({
        drug_id: z.string(),
        qty: z.number(),
      })
    });
    try {
      const validatedData = schema.parse(summaryDto);
      const extracttoken = jwt.verify(token, process.env.JWT_SECRET);

      if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
        var userId = extracttoken.userId;
      }


      const find = await this.prisma.summary.findFirst({
        where: {
          patient_id: userId,
          poly_id : validatedData.poly_id,
          doctor_id : validatedData.doctor_id,
          scheduled_date_time : validatedData.scheduled_date_time,
          qr_code : validatedData.qr_code
         },
        include: {
          poly : true,
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
          patient: {
            include: {
              user: true
            }
          },
        }
      })

      if(find) {
        const update = await this.prisma.summary.update({
          where: { id: find.id },
          data : {
            poly: {
              connect: {
                id: validatedData.poly_id
              }
            },
            doctor: {
              connect: {
                id: validatedData.doctor_id
              }
            },
            scheduled_date_time: validatedData.doctor_id,
            qr_code: validatedData.qr_code,
            image_captured_checked: validatedData.image_captured_checked,
            symptoms: validatedData.symptoms,
            symptoms_description: validatedData.symptoms_description,
            status: validatedData.status,
            ai_status: validatedData.ai_status,
            ai_response: validatedData.ai_response,
            image_url: validatedData.image_url,
            ai_token: validatedData.ai_token,
            drug: validatedData.drug,
          },
          include: {
            poly : true,
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
            patient: {
              include: {
                user: true
              }
            },
          }
        })

        return {
          status: true,
          message: 'Success',
          data: update,
        };
      } else {
        const create = await this.prisma.summary.create({
          data : {
            poly: {
              connect: {
                id: validatedData.poly_id
              }
            },
            doctor: {
              connect: {
                id: validatedData.doctor_id
              }
            },
            scheduled_date_time: validatedData.doctor_id,
            qr_code: validatedData.qr_code,
            image_captured_checked: validatedData.image_captured_checked,
            patient: {
              connect : {
                id: userId
              }
            },
            symptoms: validatedData.symptoms,
            symptoms_description: validatedData.symptoms_description,
            status: validatedData.status,
            ai_status: validatedData.ai_status,
            ai_response: validatedData.ai_response,
            image_url: validatedData.image_url,
            ai_token: validatedData.ai_token,
            drug: validatedData.drug,
          },
          include: {
            poly : true,
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
            patient: {
              include: {
                user: true
              }
            },
          }
        })

        return {
          status: true,
          message: 'Success',
          data: create,
        };
      }

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
