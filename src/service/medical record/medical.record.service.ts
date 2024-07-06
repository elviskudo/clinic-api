import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Record } from 'src/entity/latest/record.entity';
import { MedicalRecordDto } from 'src/dto/medical record/medical.record.dto';
import { UpdateMedicalRecordDto } from 'src/dto/medical record/update.medical.record.dto';
import { RecordResponseDto } from 'src/dto/medical record/medical.record.response.dto';

@Injectable()
export class MedicalRecordService {
  constructor(
    @InjectRepository(Record)
    private medicalRecordRepository: Repository<Record>,
  ) {}

  async createRecord(
    medicalRecordDto: MedicalRecordDto,
  ): Promise<RecordResponseDto> {
    const record = this.medicalRecordRepository.create(medicalRecordDto);
    await this.medicalRecordRepository.save(record);
    const savedRecord = await this.medicalRecordRepository.findOne({
      where: { id: record.id },
      relations: ['poly', 'clinic', 'doctor', 'user'],
    });

    return this.toRecordResponseDto(savedRecord);
  }

  async updateRecord(
    id: number,
    updateMedicalRecordDto: UpdateMedicalRecordDto,
  ): Promise<RecordResponseDto> {
    await this.medicalRecordRepository.update(id, updateMedicalRecordDto);
    const updatedRecord = await this.medicalRecordRepository.findOne({
      where: { id },
      relations: ['poly', 'clinic', 'doctor', 'user'],
    });

    return this.toRecordResponseDto(updatedRecord);
  }

  async findOne(id: number): Promise<RecordResponseDto> {
    const record = await this.medicalRecordRepository.findOne({
      where: { id },
      relations: ['poly', 'clinic', 'doctor', 'user'],
    });

    return this.toRecordResponseDto(record);
  }

  async findAll(): Promise<RecordResponseDto[]> {
    const records = await this.medicalRecordRepository.find({
      relations: ['poly', 'clinic', 'doctor', 'user'],
    });

    return records.map((record) => this.toRecordResponseDto(record));
  }

  async removeRecord(id: number): Promise<void> {
    await this.medicalRecordRepository.delete(id);
  }

  private toRecordResponseDto(record: Record): RecordResponseDto {
    return {
      id: record.id,
      consultation_date_time: record.consultation_date_time,
      way_to_come: record.way_to_come,
      visiting_time: record.vistting_time,
      transportation: record.transportation,
      reference: record.reference,
      person_responsible: record.person_responsible,
      traumatic: record.traumatic,
      non_traumatic: record.non_traumatic,
      conditions: record.conditions,
      complaint: record.complaint,
      history_of_illness: record.history_of_illness,
      solution: record.solution,
      user_id: record.user_id,
      user: {
        phone_number: record.user?.phone_number,
        email: record.user?.email,
      },
      poly_id: record.poly_id,
      poly: { name: record.poly?.name },
      clinic_id: record.clinic_id,
      clinic: { clinic_name: record.clinic?.clinic_name },
      doctor_id: record.doctor_id,
      doctor: { doctor_name: record.doctor?.doctor_name },
    };
  }
}
