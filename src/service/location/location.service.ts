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
  ): Promise<Wilayah[]> {
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
    return cities;
  }
}
