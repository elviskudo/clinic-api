import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Poly } from 'src/entity/clinic/poly.entity';
import { PolyDto } from 'src/dto/clinic/poly.dto';
import { UpdatePolyDto } from 'src/dto/clinic/update.poly.dto';

@Injectable()
export class PolyService {
  constructor(
    @InjectRepository(Poly)
    private polyRepository: Repository<Poly>,
  ) {}

  async createPoly(polyDto: PolyDto): Promise<Poly> {
    const poly = this.polyRepository.create(polyDto);
    await this.polyRepository.save(poly);
    return this.polyRepository.findOne({ where: { id: poly.id }, relations: ['clinic'] });
  }

  async updatePoly(id: number, updatePolyDto: UpdatePolyDto): Promise<Poly> {
    await this.polyRepository.update(id, updatePolyDto);
    return this.polyRepository.findOne({
      where: { id },
      relations: ['clinic'],
    });
  }

  async findOne(id: number): Promise<Poly> {
    const poly = await this.polyRepository.findOne({
      where: { id },
      relations: ['clinic'],
    });

    if (!poly) {
      throw new NotFoundException(`Poly with ID ${id} not found`);
    }
    return poly;
  }

  async findAll(): Promise<Poly[]> {
    return this.polyRepository.find({ relations: ['clinic'] });
  }

  async removePoly(id: number): Promise<void> {
    const result = await this.polyRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Poly with ID ${id} not found`);
    }
  }
}
