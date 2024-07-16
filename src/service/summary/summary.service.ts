import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SummaryDto } from 'src/dto/summary/summary.dto';
import { UpdateSummaryDto } from 'src/dto/summary/update.summary.dto';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from 'src/prisma.service';
import { ZodError, z } from 'zod';
import { Status } from '@prisma/client';

@Injectable()
export class SummaryService {
  constructor(private prisma: PrismaService) {}

  async getappointments(
    token: string,
    page: number,
    limit: number,
    order: 'asc' | 'desc' = 'asc',
    status: Status,
  ) {
    try {
      const extracttoken = jwt.verify(token, process.env.JWT_SECRET);

      if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
        var userId = extracttoken.userId;
      }

      const profile = await this.prisma.profile.findUnique({
        where: { user_id: userId },
      });

      if (!profile) {
        return {
          status: false,
          message: 'Profile tidak ditemukan',
          data: null,
        };
      }

      const skip = (page - 1) * limit;

      const find = await this.prisma.summary.findMany({
        where: {
          patient_id: profile.id,
          status: status || undefined,
        },
        take: Number(limit) || 10,
        skip: skip || 0,
        orderBy: order ? { scheduled_date_time: order } : undefined,
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
          doctor: {
            include: {
              poly: {
                include: {
                  clinic: true,
                },
              },
              city: true,
            },
          },
          patient: {
            include: {
              user: true,
            },
          },
        },
      });

      const result = find.map((find) => ({
        ...find,
        poly: {
          clinic: {
            ...find.poly.clinic,
            city_id: Number(find.poly.clinic.city_id),
            city: {
              ...find.poly.clinic.city,
              id: Number(find.poly.clinic.city.id),
            },
          },
        },
        doctor: {
          poly: {
            clinic: {
              ...find.poly.clinic,
              city_id: Number(find.poly.clinic.city_id),
              city: {
                ...find.poly.clinic.city,
                id: Number(find.poly.clinic.city.id),
              },
            },
          },
          wilayah_id: Number(find.doctor.wilayah_id),
          city: {
            ...find.doctor.city,
            id: Number(find.doctor.city.id),
          },
        },
        patient: {
          city: {
            ...find.patient,
            city_id: Number(find.patient.city_id),
          },
        },
      }));

      return {
        status: true,
        message: 'Success',
        data: result,
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

  async detailappointments(id: string, token: string) {
    try {
      const extracttoken = jwt.verify(token, process.env.JWT_SECRET);

      if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
        var userId = extracttoken.userId;
      }

      const profile = await this.prisma.profile.findUnique({
        where: { user_id: userId },
      });

      if (!profile) {
        return {
          status: false,
          message: 'Profile tidak ditemukan',
          data: null,
        };
      }

      const find = await this.prisma.summary.findFirst({
        where: {
          id: id,
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
          doctor: {
            include: {
              poly: {
                include: {
                  clinic: true,
                },
              },
              city: true,
            },
          },
          patient: {
            include: {
              user: true,
            },
          },
        },
      });

      const serializedResult = {
        ...find,
        poly: {
          clinic: {
            ...find.poly.clinic,
            city_id: Number(find.poly.clinic.city_id),
            city: {
              ...find.poly.clinic.city,
              id: Number(find.poly.clinic.city.id),
            },
          },
        },
        doctor: {
          poly: {
            clinic: {
              ...find.poly.clinic,
              city_id: Number(find.poly.clinic.city_id),
              city: {
                ...find.poly.clinic.city,
                id: Number(find.poly.clinic.city.id),
              },
            },
          },
          wilayah_id: Number(find.doctor.wilayah_id),
          city: {
            ...find.doctor.city,
            id: Number(find.doctor.city.id),
          },
        },
        patient: {
          city: {
            ...find.patient,
            city_id: Number(find.patient.city_id),
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

  async createSummary(token: string, summaryDto: SummaryDto) {
    const schema = z.object({
      poly_id: z.string().min(1),
      doctor_id: z.string().min(1),
      scheduled_date_time: z.string().min(1),
      qr_code: z.string().min(1),
      image_captured_checked: z.boolean(),
      symptoms: z.string().min(1),
      symptoms_description: z.string().min(1),
      ai_response: z.string(),
      ai_status: z.boolean(),
      image_url: z.string(),
      ai_token: z.string(),
      drug: z.array(
        z.object({
          drug_id: z.string(),
          qty: z.number(),
        }),
      ),
    });
    try {
      const validatedData = schema.parse(summaryDto);
      const extracttoken = jwt.verify(token, process.env.JWT_SECRET);

      if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
        var userId = extracttoken.userId;
      }

      const profile = await this.prisma.profile.findUnique({
        where: { user_id: userId },
      });

      if (!profile) {
        return {
          status: false,
          message: 'Profile tidak ditemukan',
          data: null,
        };
      }

      const find = await this.prisma.summary.findFirst({
        where: {
          patient_id: profile.id,
          poly_id: validatedData.poly_id,
          doctor_id: validatedData.doctor_id,
          scheduled_date_time: validatedData.scheduled_date_time,
          qr_code: validatedData.qr_code,
        },
        include: {
          poly: true,
          doctor: {
            include: {
              poly: {
                include: {
                  clinic: true,
                },
              },
              city: true,
            },
          },
          patient: {
            include: {
              user: true,
            },
          },
        },
      });

      if (find) {
        let getstatus;

        if (find.symptoms && find.ai_response) {
          getstatus = Status.diagnosed;
        } else {
          getstatus = Status.waiting;
        }

        const update = await this.prisma.summary.update({
          where: { id: find.id },
          data: {
            poly: {
              connect: {
                id: validatedData.poly_id,
              },
            },
            doctor: {
              connect: {
                id: validatedData.doctor_id,
              },
            },
            scheduled_date_time: validatedData.scheduled_date_time,
            qr_code: validatedData.qr_code,
            image_captured_checked: validatedData.image_captured_checked,
            symptoms: validatedData.symptoms,
            symptoms_description: validatedData.symptoms_description,
            status: getstatus,
            ai_status: validatedData.ai_status,
            ai_response: validatedData.ai_response,
            image_url: validatedData.image_url,
            ai_token: validatedData.ai_token,
            drug: validatedData.drug,
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
            doctor: {
              include: {
                poly: {
                  include: {
                    clinic: true,
                  },
                },
                city: true,
              },
            },
            patient: {
              include: {
                user: true,
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
          doctor: {
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
            wilayah_id: Number(update.doctor.wilayah_id),
            city: {
              ...update.doctor.city,
              id: Number(update.doctor.city.id),
            },
          },
          patient: {
            city: {
              ...update.patient,
              city_id: Number(update.patient.city_id),
            },
          },
        };

        return {
          status: true,
          message: 'Success',
          data: serializedResult,
        };
      } else {
        const create = await this.prisma.summary.create({
          data: {
            poly: {
              connect: {
                id: validatedData.poly_id,
              },
            },
            doctor: {
              connect: {
                id: validatedData.doctor_id,
              },
            },
            scheduled_date_time: validatedData.scheduled_date_time,
            qr_code: validatedData.qr_code,
            image_captured_checked: validatedData.image_captured_checked,
            patient: {
              connect: {
                id: profile.id,
              },
            },
            symptoms: validatedData.symptoms,
            symptoms_description: validatedData.symptoms_description,
            status: Status.waiting,
            ai_status: validatedData.ai_status,
            ai_response: validatedData.ai_response,
            image_url: validatedData.image_url,
            ai_token: validatedData.ai_token,
            drug: validatedData.drug,
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
            doctor: {
              include: {
                poly: {
                  include: {
                    clinic: true,
                  },
                },
                city: true,
              },
            },
            patient: {
              include: {
                user: true,
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
          doctor: {
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
            wilayah_id: Number(create.doctor.wilayah_id),
            city: {
              ...create.doctor.city,
              id: Number(create.doctor.city.id),
            },
          },
          patient: {
            city: {
              ...create.patient,
              city_id: Number(create.patient.city_id),
            },
          },
        };

        return {
          status: true,
          message: 'Success',
          data: serializedResult,
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
