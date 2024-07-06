import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorDto } from 'src/dto/clinic/doctor.dto';
import { UpdateDoctorDto } from 'src/dto/clinic/update.doctor.dto';
import { Doctor } from 'src/entity/clinic/doctor.entity';
import { Like, Repository } from 'typeorm';
import { PolyService } from './poly.service';
import { WilayahService } from '../location/location.service';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
    private readonly wilayahService: WilayahService,
    private readonly polyService: PolyService,
  ) {}

  async createDoctor(doctorDto: DoctorDto): Promise<any> {
    const doctor = this.doctorRepository.create(doctorDto);
    const savedDoctor = await this.doctorRepository.save(doctor);
    return this.mapToPostDoctorResponse(savedDoctor);
  }

  async updateDoctor(
    id: number,
    updateDoctorDto: UpdateDoctorDto,
  ): Promise<Doctor> {
    await this.doctorRepository.update(id, updateDoctorDto);
    return this.findOne(id);
  }

  async findOne(id: number): Promise<any> {
    const doctor = await this.doctorRepository.findOne({
      where: { id },
      relations: ['poly', 'wilayah'],
    });
    return this.mapToDoctorResponse(doctor);
  }

  async findAll(
    query: string,
    page: number,
    limit: number,
    order: 'ASC' | 'DESC' = 'ASC',
  ): Promise<any[]> {
    const skip = (page - 1) * limit;

    const whereClause = query
      ? [
          { doctor_name: Like(`%${query}%`) },
          { description: Like(`%${query}%`) },
          { address: Like(`%${query}%`) },
          { education: Like(`%${query}%`) },
        ]
      : {};

    const doctors = await this.doctorRepository.find({
      where: whereClause,
      take: limit || 10,
      skip: skip || 0,
      order: {
        doctor_name: order,
      },
      relations: ['poly', 'wilayah'],
    });

    return doctors.map((doctor) => this.mapToDoctorResponse(doctor));
  }

  async removeDoctor(id: number): Promise<void> {
    await this.doctorRepository.delete(id);
  }

  private mapToDoctorResponse(doctor: Doctor): any {
    return {
      id: doctor.id,
      doctor_name: doctor.doctor_name,
      description: doctor.description,
      address: doctor.address,
      post_code: doctor.post_code,
      latitude: doctor.latitude,
      longitude: doctor.longitude,
      title: doctor.title,
      experience: doctor.experience,
      education: doctor.education,
      poly_id: doctor.poly_id,
      poly: {
        id: doctor.poly.id,
        name: doctor.poly.name,
        description: doctor.poly.description,
        clinic_id: doctor.poly.clinic_id,
      },
      wilayah_id: doctor.wilayah_id,
      wilayah: {
        id: doctor.wilayah.id,
        provinsi: doctor.wilayah.provinsi,
        kabupaten: doctor.wilayah.kabupaten,
        kecamatan: doctor.wilayah.kecamatan,
        kelurahan: doctor.wilayah.kelurahan,
      },
    };
  }

  private mapToPostDoctorResponse(doctor: Doctor): any {
    return {
      doctor_name: doctor.doctor_name,
      description: doctor.description,
      address: doctor.address,
      post_code: doctor.post_code,
      latitude: doctor.latitude,
      longitude: doctor.longitude,
      title: doctor.title,
      experience: doctor.experience,
      education: doctor.education,
      poly_id: doctor.poly_id,
      wilayah_id: doctor.wilayah_id,
    };
  }
}
