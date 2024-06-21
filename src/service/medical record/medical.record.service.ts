import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Record } from 'src/entity/latest/record.entity';
import { MedicalRecordDto } from 'src/dto/medical record/medical.record.dto';
import { UpdateMedicalRecordDto } from 'src/dto/medical record/update.medical.record.dto';

@Injectable()
export class MedicalRecordService {
  constructor(
    @InjectRepository(Record)
    private medicalRecordRepository: Repository<Record>,
  ) {}

  async createRecord(medicalRecordDto: MedicalRecordDto): Promise<Record> {
    const record = this.medicalRecordRepository.create(medicalRecordDto);
    return this.medicalRecordRepository.save(record);
  }

  async updateRecord(
    id: number,
    updateMedicalRecordDto: UpdateMedicalRecordDto,
  ): Promise<Record> {
    await this.medicalRecordRepository.update(id, updateMedicalRecordDto);
    return this.medicalRecordRepository.findOne({ where: { id } });
  }

  async findOne(id: number): Promise<Record> {
    return this.medicalRecordRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<Record[]> {
    return this.medicalRecordRepository.find();
  }

  async removeRecord(id: number): Promise<void> {
    await this.medicalRecordRepository.delete(id);
  }
}
