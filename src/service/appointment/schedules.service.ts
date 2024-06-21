import { Injectable, Param, ParseIntPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import { ScheduleEntity } from 'src/entity/appointment/schedules.entity';
import { Profile } from 'src/entity/profile/profile.entity';
import { ScheduleDoctorEntity } from 'src/entity/appointment/schedules_doctor';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(ScheduleEntity)
    private readonly scheduleReposity: Repository<ScheduleEntity>,
    private readonly jwtService: JwtService,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(ScheduleDoctorEntity)
    private readonly scheduleDoctorReposity: Repository<ScheduleDoctorEntity>,
  ) {}

  async getAll(token: string, doctor_id: number, date: Date) {
    const extracttoken = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
      const userId = extracttoken.userId;

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      let records: ScheduleDoctorEntity[] | null = null;

      if (doctor_id && date) {
        records = await this.scheduleDoctorReposity.find({
          where: {
            date: date,
            doctor_id: doctor_id,
          },
          select: ["time"],
        });
      } else if (doctor_id) {
        records = await this.scheduleDoctorReposity.find({
          where: {
            doctor_id: doctor_id,
          },
          select: ["time"],
        });
      } else if (date) {
        records = await this.scheduleDoctorReposity.find({
          where: {
            date: date,
          },
          select: ["time"],
        });
      } else {
        records = await this.scheduleDoctorReposity.find({
          where: {
            date: today,
          },
          select: ["time"],
        });
      }

      if (records && records.length > 0) {
        return {
          status: true,
          message: 'Success ambil data schedule',
          data: {
            date: true,
            time: records
          },
        };
      } else {
        return {
          status: false,
          message: 'tidak ada data yang berhasil di ambil',
          data: {
            date: false,
            time: null
          },
        };
      }
    } else {
      return {
        status: false,
        message: 'Invalid token',
        data: {
          date: false,
          time: null
        },
      };
    }
  }

  async getToken(token: string) {
    const extracttoken = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
      const userId = extracttoken.userId;

      const records = await this.scheduleReposity.find({
        where: {
          user_id: userId,
        },
        select: ["code", "doctor_id", "approval"],
      });

      if (records) {
        return {
          status: true,
          message: 'Success ambil data approval token',
          data: {
            records
          },
        };
      } else {
        return {
          status: false,
          message: 'tidak ada data yang berhasil di ambil',
          data: {
            date: false,
            time: null
          },
        };
      }

    } else {
      return {
        status: false,
        message: 'Invalid token',
        data: null,
      };
    }
  }

  async Create(token: string,createData: Partial<ScheduleEntity>, clinic_name: string, poly_name: string) {
    const extracttoken = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
      const userId = extracttoken.userId;

      const Checkdatadouble = await this.scheduleReposity.findOne({
        where: { time: createData.time },
      });

      if (!Checkdatadouble) {
        return {
          status: false,
          message: 'Data sudah tersedia.',
          data: null
        };
      }

      const latestSchedule = await this.scheduleReposity.findOne({
        order: { id: 'DESC' },
      });
  
      const latestCode = latestSchedule?.code ?? '';
      const codePrefix = `E+${clinic_name}+${poly_name}+`;
      let increment = 1;
  
      if (latestCode.startsWith(codePrefix)) {
        const numericPart = latestCode.substring(codePrefix.length);
        increment = parseInt(numericPart, 10) + 1;
      }

      const format_increment = increment.toString().padStart(3, '0');
      const get_code = `${codePrefix}${format_increment}`;

      const ScheduleCreate = this.scheduleReposity.create({
        doctor_id: createData.doctor_id,
        approval: false,
        user_id: userId,
        date: createData.date,
        time: createData.time,
      });
  
      const save = await this.scheduleReposity.save(ScheduleCreate);

      const get_profile_doctor = this.profileRepository.findOne({
        where: { user_id: save.id },
      });
      
      if(save){
        return {
            status: true,
            message: 'Data berhasil di tambah.',
            data: {
              code: get_code,
              doctor_id: createData.doctor_id,
              doctor: {
                get_profile_doctor
              }
            }
          };
      } else {
        return {
            status: false,
            message: 'Kesalahan!!, error to create new data.',
            data: null
          };
      }

    } else {
      return {
        status: false,
        message: 'Invalid token',
        data: null,
      };
    }
  }

  async ApprovalToken(token: string,createData: Partial<ScheduleEntity>,code: string) {
    const extracttoken = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
      const userId = extracttoken.userId;

      const CheckDatas = await this.scheduleReposity.findOne({
        where: {
          code: code,
          doctor_id: createData.doctor_id,
        },
      });

      if(!CheckDatas) {
        return {
          status: false,
          message: 'Kesalahan!!, error to create new data.',
          data: null
        };
      }

      CheckDatas.approval = createData.approval;

      const save = await this.scheduleReposity.save(CheckDatas);
      
      const get_profile_doctor = this.profileRepository.findOne({
        where: { user_id: save.id },
      });

      if(save){
        return {
            status: true,
            message: 'Data berhasil di tambah.',
            data: {
              code: save.code,
              doctor_id: save.doctor_id,
              doctor: {
                get_profile_doctor
              }
            }
          };
      } else {
        return {
            status: false,
            message: 'Kesalahan!!, error to create new data.',
            data: null
          };
      }

    } else {
      return {
        status: false,
        message: 'Invalid token',
        data: null,
      };
    }
  }

  async Update(token: string,updateData: Partial<ScheduleEntity>) {
    const extracttoken = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
      const userId = extracttoken.userId;

      const Checkdatadouble = await this.scheduleReposity.findOne({
        where: { time: updateData.time },
      });

      if (!Checkdatadouble) {
        return {
          status: false,
          message: 'Data sudah tersedia.',
          data: null
        };
      }

      const checkData = await this.scheduleReposity.findOne({
        where: { id: updateData.id },
      });

      Object.assign(checkData, updateData);

      const save = await this.scheduleReposity.save(checkData);

      if(save){
        return {
            status: true,
            message: 'Data berhasil di ubah.',
            data: save
          };
      } else {
        return {
            status: false,
            message: 'Kesalahan!!, error to update data.',
            data: null
          };
      }

    } else {
      return {
        status: false,
        message: 'Invalid token',
        data: null,
      };
    }
  }

  async SetTime(token: string,createData: Partial<ScheduleDoctorEntity>) {
    const extracttoken = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
      const userId = extracttoken.userId;

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const CheckDatas = await this.scheduleDoctorReposity
      .createQueryBuilder('schedule')
      .where('schedule.date = :date', { date: today })
      .andWhere('schedule.doctor_id = :doctor_id', { doctor_id: createData.doctor_id })
      .andWhere(':time = ANY(schedule.time)', { time: createData.time })
      .getOne();

      if(!CheckDatas) {
        return {
          status: false,
          message: 'Terdapat data yang sama',
          data: null
        };
      }

      const scheduleCreate = this.scheduleDoctorReposity.create({
        doctor_id: createData.doctor_id,
        date: createData.date,
        time: createData.time,
      });

      const save = await this.scheduleDoctorReposity.save(scheduleCreate);

      if(save){
        return {
            status: true,
            message: 'Data berhasil di tambah.',
            data: {
              date: true,
              time : save.time
              }
            }
      } else {
        return {
            status: false,
            message: 'Kesalahan!!, error to create new data.',
            data: null
          };
      }

    } else {
      return {
        status: false,
        message: 'Invalid token',
        data: null,
      };
    }
  }
  
}
