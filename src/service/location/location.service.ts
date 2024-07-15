import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { wilayah } from '@prisma/client';
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
    const skip = Math.floor((page - 1) * limit);
  
    const whereClause = query
      ? {
          OR: [
            { provinsi: { contains: query.toLowerCase(), mode: undefined } },
            { kabupaten: { contains: query.toLowerCase(), mode: undefined } },
            { kecamatan: { contains: query.toLowerCase(), mode: undefined } },
            { kelurahan: { contains: query.toLowerCase(), mode: undefined } },
          ],
        }
      : {};
  
    if (!limit) {
      limit = 10;
    }
  
    const result = await this.prisma.wilayah.findMany({
      where: {
        kabupaten : query
      },
      take: Number(limit),
      skip: skip,
      orderBy: {
        kabupaten: order,
      },
    });

    const serializedResult = result.map((item: wilayah) => ({
      ...item,
      id: Number(item.id), 
    }));
  
    return serializedResult;
  }
}
