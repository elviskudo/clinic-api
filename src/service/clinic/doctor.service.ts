import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorDto } from 'src/dto/clinic/doctor.dto';
import { UpdateDoctorDto } from 'src/dto/clinic/update.doctor.dto';
import { Doctor } from 'src/entity/clinic/doctor.entity';
import { Repository } from 'typeorm';
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

  async createDoctor(doctorDto: DoctorDto): Promise<Doctor> {
    const doctor = this.doctorRepository.create(doctorDto);
    return this.doctorRepository.save(doctor);
  }

  async updateDoctor(
    id: number,
    updateDoctorDto: UpdateDoctorDto,
  ): Promise<Doctor> {
    await this.doctorRepository.update(id, updateDoctorDto);
    return this.doctorRepository.findOne({ where: { id } });
  }

  async findOne(id: number): Promise<Doctor> {
    return this.doctorRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<Doctor[]> {
    return this.doctorRepository.find();
  }

  async removeDoctor(id: number): Promise<void> {
    await this.doctorRepository.delete(id);
  }

  // async getDoctorWithPolyAndCity(doctorId: number): Promise<any> {
  //   const doctor = await this.findOne(doctorId);
  //   if (!doctor) {
  //     return null;
  //   }

  //   const cityData = await this.wilayahService.getByCityId(doctor.city_id);
  //   const polyData = await this.polyService.getById(doctor.poly_id);

  //   const doctorDto: DoctorDto = {
  //     poly_id: doctor.poly_id,
  //     doctor_name: doctor.doctor_name,
  //     description: doctor.description,
  //     address: doctor.address,
  //     city_id: doctor.city_id,
  //     post_code: doctor.post_code,
  //     latitude: doctor.latitude,
  //     longitude: doctor.longitude,
  //     title: doctor.title,
  //     education: doctor.education,
  //     experience: doctor.experience,
  //   };

  //   return { doctor: doctorDto, city: cityData, poly: polyData };
  // }
}
