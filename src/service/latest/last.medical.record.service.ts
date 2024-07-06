import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import { LastMedicalRecordDto } from 'src/dto/latest/last.medical.record.dto';
import { Record } from 'src/entity/latest/record.entity';

@Injectable()
export class LastMedicalRecordService {
  constructor(
    @InjectRepository(Record)
    private readonly lastMedicalRecordRepository: Repository<Record>,
    private readonly jwtService: JwtService,
  ) {}

  async getLastMedicalRecord(token: string) {
    const extracttoken = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
      const userId = extracttoken.userId;

      const record = await this.lastMedicalRecordRepository.findOne({
        where: { user_id: userId },
        order: { consultation_date_time: 'DESC' },
        select: [
          'consultation_date_time',
          // 'doctor_name',
          // 'polyclinic',
          // 'clinic_name',
          'conditions',
        ],
      });

      if (record) {
        return {
          status: true,
          message: 'Last medical record retrieved successfully',
          data: record,
        };
      } else {
        return {
          status: false,
          message: 'No medical records found for this user',
          data: null,
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

  async createLastMedicalRecord(
    token: string,
    createLastMedicalRecordDto: LastMedicalRecordDto,
  ) {
    const extracttoken = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
      const userId = extracttoken.userId;

      const newRecord = this.lastMedicalRecordRepository.create({
        ...createLastMedicalRecordDto,
        user_id: userId,
      });

      await this.lastMedicalRecordRepository.save(newRecord);

      return {
        status: true,
        message: 'Medical record created successfully',
        data: newRecord,
      };
    } else {
      return {
        status: false,
        message: 'Invalid token',
        data: null,
      };
    }
  }
}
