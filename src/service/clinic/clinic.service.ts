import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClinicDto } from 'src/dto/clinic/clinic.dto';
import { UpdateClinicDto } from 'src/dto/clinic/update.clinic.dto';
import { Clinic } from 'src/entity/clinic/clinic.entity';
import { Repository } from 'typeorm';
import { WilayahService } from '../location/location.service';

@Injectable()
export class ClinicService {
  constructor(
    @InjectRepository(Clinic)
    private clinicRepository: Repository<Clinic>,
    private readonly wilayahService: WilayahService,
  ) {}

  async createClinic(clinicDto: ClinicDto): Promise<Clinic> {
    const clinic = this.clinicRepository.create(clinicDto);
    return this.clinicRepository.save(clinic);
  }

  async updateClinic(
    id: number,
    updateClinicDto: UpdateClinicDto,
  ): Promise<Clinic> {
    await this.clinicRepository.update(id, updateClinicDto);
    return this.clinicRepository.findOne({ where: { id } });
  }

  async findOne(id: number): Promise<Clinic> {
    return this.clinicRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<Clinic[]> {
    return this.clinicRepository.find();
  }

  async removeClinic(id: number): Promise<void> {
    await this.clinicRepository.delete(id);
  }

  // async getClinicWithCity(clinicId: number) {
  //   const clinic = await this.findOne(clinicId);
  //   if (!clinic) {
  //     return null;
  //   }

  //   const cityId = clinic.city_id;
  //   const cityData = await this.wilayahService.getByCityId(cityId);

  //   return { clinic, city: cityData };
  // }
}
