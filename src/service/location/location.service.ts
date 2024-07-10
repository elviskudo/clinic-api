import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PrismaService } from 'src/prisma.service';
import { Repository, Like } from 'typeorm';

@Injectable()
export class WilayahService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async getCities(
    query: string,
    page: number,
    limit: number,
    order: 'asc' | 'desc' = 'asc',
  ) {
    const skip = (page - 1) * limit;

    const whereClause = query
    ? {
        OR: [
          { provinsi: { contains: query, mode: 'insensitive' } },
          { kabupaten: { contains: query, mode: 'insensitive' } },
          { kecamatan: { contains: query, mode: 'insensitive' } },
          { kelurahan: { contains: query, mode: 'insensitive' } },
        ],
      }
    : {};

    const result = this.prisma.wilayah.findMany({
      where: whereClause,
      take: limit || 10,
      skip: skip || 0,
      orderBy: {
        kabupaten: order,
      },
    })


    return result;
  }
}
