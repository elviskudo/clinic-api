import { Injectable, Param, ParseIntPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from 'src/prisma.service';
import { ZodError, z } from 'zod';
import { time } from 'console';
import { SchedulesDTO } from 'src/dto/appointment/schedule.dto';
import { connect } from 'http2';
import { approvaltokenDTO } from 'src/dto/appointment/approval-token.dto';
import { SchedulesUpdateDTO } from 'src/dto/appointment/scheduleupdate.dto';
import { setTimeDTO } from 'src/dto/appointment/set-time.dto';

@Injectable()
export class SchedulesService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async getAll(token: string, doctor_id: string, date: Date) {
    try {

      const extracttoken = jwt.verify(token, process.env.JWT_SECRET);

      if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
        var userId = extracttoken.userId;
      }

      let records

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (doctor_id && date) {
        records = await this.prisma.scheduleDoctor.findMany({
          where: {
            date: date,
            doctor_id: doctor_id,
          },
          select: {
            time: true,
            doctor_id: true,
            date: true,
            doctor: {
              select: {
                poly: {
                  select: {
                    clinic: true,
                  },
                },
                city: true,
              },
            },
          },
        });
      } else if (doctor_id) {
        records = await this.prisma.scheduleDoctor.findMany({
          where: {
            doctor_id: doctor_id,
          },
          select: {
            time: true,
            doctor_id: true,
            date: true,
            doctor: {
              select: {
                poly: {
                  select: {
                    clinic: true,
                  },
                },
                city: true,
              },
            },
          },
        });
      } else if (date) {
        records = await this.prisma.scheduleDoctor.findMany({
          where: {
            date: date
          },
          select: {
            time: true,
            doctor_id: true,
            date: true,
            doctor: {
              select: {
                poly: {
                  select: {
                    clinic: true,
                  },
                },
                city: true,
              },
            },
          },
        });
      } else {
        records = await this.prisma.scheduleDoctor.findMany({
          where: {
            date: today,
          },
          select: {
            time: true,
            doctor_id: true,
            date: true,
            doctor: {
              select: {
                poly: {
                  select: {
                    clinic: true,
                  },
                },
                city: true,
              },
            },
          },
        });
      }

     
      if (records && records.length > 0) {
        const groupedRecords = records.reduce((acc, record) => {
          const dateObj = new Date(record.date);
          const dateStr = dateObj.toISOString().split('T')[0];
          if (!acc[dateStr]) {
            acc[dateStr] = {
              date: dateStr,
              times: [],
              doctor_id: record.doctor_id,
              doctor: record.doctor,
              poly_id: record.poly_id,
              poly: record.poly,
              clinic_id: record.clinic_id,
              clinic: record.clinic,
            };
          }
          acc[dateStr].times.push(record.date);
          return acc;
        }, {});

        const formattedRecords = Object.values(groupedRecords);

        return {
          status: true,
          message: 'Success ambil data schedule',
          data: {
            status: true,
            data: formattedRecords[0],
          },
        };
      } else {
        return {
          status: false,
          message: 'tidak ada data yang berhasil di ambil',
          data: {
            status: false,
            data: null,
          },
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

  async getToken(token: string) {
    try {

      const extracttoken = jwt.verify(token, process.env.JWT_SECRET);

      if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
        var userId = extracttoken.userId;
      }


      const records = await this.prisma.schedule.findMany({
        where: { user_id : userId },
        select: {
          code: true,
          doctor_id: true,
          approval: true,
          doctor: {
            select: {
              poly: {
                select: {
                  clinic: true,
                },
              },
              city: true,
            },
          },
        },
      })

      if (records.length > 0) {
        return {
          status: true,
          message: 'Success ambil data approval token',
          data: records,
        };
      } else {
        return {
          status: false,
          message: 'Tidak ada data yang berhasil di ambil',
          data: null,
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

  async Create(
    token: string,
    createData: SchedulesDTO
  ) {
    const schema = z.object({
      doctor_id: z.string().min(1),
      clinic_name: z.string().min(1),
      poly_name: z.string().min(1),
      date: z.date(),
      time: z.string().min(1),
    });
    try {
      const validatedData = schema.parse(createData);
      const extracttoken = jwt.verify(token, process.env.JWT_SECRET);

      if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
        var userId = extracttoken.userId;
      }


      const find = await this.prisma.schedule.findFirst({
        where: { time: createData.time }
      })

      if (find) {
        return {
          status: false,
          message: 'Data sudah tersedia.',
          data: null,
        };
      }

      const getlatest = await this.prisma.schedule.findFirst({
        orderBy: { id : 'desc' }
      })

      const latestCode = getlatest?.code ?? '';
      const codePrefix = `E${createData.clinic_name}${createData.poly_name}`;
      let increment = 1;

      if (latestCode.startsWith(codePrefix)) {
        const numericPart = latestCode.substring(codePrefix.length);
        increment = parseInt(numericPart, 10) + 1;
      }

      const format_increment = increment.toString().padStart(3, '0');
      const get_code = `${codePrefix}${format_increment}`;

      const save = await this.prisma.schedule.create({
        data: {
          code: get_code,
          doctor: {
            connect :{
              id: createData.doctor_id
            }
          },
          user: {
            connect: {
              id: userId
            }
          },
          date : createData.date,
          approval : false,
          time : createData.time,
        },
        select: {
          code: true,
          doctor_id: true,
          doctor: {
            select: {
              poly: {
                select: {
                  clinic: true,
                },
              },
              city: true,
            },
          },
        },
      })

      if (save) {
        return {
          status: true,
          message: 'Data berhasil ditambahkan.',
          data: save,
        };
      } else {
        return {
          status: false,
          message: 'Kesalahan!!, error to create new data.',
          data: null,
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

  async ApprovalToken(
    token: string,
    createData: approvaltokenDTO,
  ) {
    const schema = z.object({
      code: z.string().min(1),
      approval: z.boolean(),
    });
    try {
      const validatedData = schema.parse(createData);
      const extracttoken = jwt.verify(token, process.env.JWT_SECRET);

      if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
        var userId = extracttoken.userId;
      }


      const find = await this.prisma.schedule.findFirst({
        where: {
          code: validatedData.code,
        },
        include: {
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
        }
      })

      if(!find) {
        return {
          status: false,
          message: 'Code tidak ditemukan',
          data: null,
        };
      }

      const update = await this.prisma.schedule.update({
        where: {
          id: find.id,
        },
        data: {
          approval: validatedData.approval
        },
        include: {
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
        }
      });

      return {
        status: true,
        message: 'Success',
        data: update,
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

  async Update(token: string, updateData: SchedulesUpdateDTO, id: string) {
    const schema = z.object({
      date: z.date(),
      time: z.string().min(1),
    });
    try {
      const validatedData = schema.parse(updateData);
      const extracttoken = jwt.verify(token, process.env.JWT_SECRET);

      if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
        var userId = extracttoken.userId;
      }


      const find = await this.prisma.schedule.findFirst({
        where: {
          id: id,
        },
        include: {
          user: true,
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
        }
      })

      if(!find) {
        return {
          status: false,
          message: 'id tidak ditemukan',
          data: null,
        };
      }

      const update = await this.prisma.schedule.update({
        where: {
          id: find.id,
        },
        data: {
          date: validatedData.date,
          time: validatedData.time
        },
        include: {
          user: true,
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
        }
      });

      return {
        status: true,
        message: 'Success',
        data: update,
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

  async SetTime(token: string, createData: setTimeDTO) {
    const schema = z.object({
      doctor_id: z.string().min(1),
      poly_id: z.string().min(1),
      clinic_id: z.string().min(1),
      date: z.date(),
      time: z.array(z.string()).nonempty('should not be empty')
    });
    try {
      const validatedData = schema.parse(createData);
      const extracttoken = jwt.verify(token, process.env.JWT_SECRET);

      if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
        var userId = extracttoken.userId;
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (!Array.isArray(createData.time)) {
        return {
          status: false,
          message: 'Kesalahan!!, waktu tidak valid.',
          data: null,
        };
      }

      for (const timeSlot of createData.time) {
        try {
          const checkdata = await this.prisma.scheduleDoctor.findFirst({
            where: {
              doctor_id: createData.doctor_id,
              date: createData.date,
              time: timeSlot,
            },
          });

          if (!checkdata) {
            const save = this.prisma.scheduleDoctor.create({
             data: {
              doctor: {
                connect: {
                  id: createData.doctor_id
                }
              },
              clinic: {
                connect: {
                  id: createData.clinic_id
                }
              },
              poly: {
                connect : {
                  id : createData.poly_id
                }
              },
              date: createData.date,
              time: timeSlot,
             }
            });

            if (!save) {
              return {
                status: false,
                message: 'Kesalahan!!, gagal menyimpan data baru.',
                data: null,
              };
            }
          }
        } catch (innerError) {
          return {
            status: false,
            message: 'Kesalahan!!, error saat menyimpan data baru.',
            data: null,
          };
        }
      }

      return {
        status: true,
        message: 'Data berhasil ditambahkan.',
        data: {
          date: createData.date,
          time: createData.time,
        },
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
