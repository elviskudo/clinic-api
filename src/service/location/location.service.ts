import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wilayah } from 'src/entity/location/wilayah.entity';
import { Repository, Like } from 'typeorm';

@Injectable()
export class WilayahService {
  constructor(
    @InjectRepository(Wilayah)
    private readonly wilayahRepository: Repository<Wilayah>,
  ) {}

  async getCities(
    query: string,
    page: number,
    limit: number,
    order: 'ASC' | 'DESC' = 'ASC',
  ) {
    const skip = (page - 1) * limit;

    const whereClause = query ? { kabupaten: Like(`%${query}%`) } : {};

    const cities = await this.wilayahRepository.find({
      where: whereClause,
      take: limit || 10,
      skip: skip || 0,
      order: {
        kabupaten: order,
      },
    });

    const result = cities.map(cities => ({
      id : parseInt(cities.id.toString(), 10),
      provinsi : cities.provinsi,
      kabupaten : cities.kabupaten,
      kecamatan: cities.kecamatan,
      kelurahan: cities.kelurahan
    }));


    return result;
  }
}
