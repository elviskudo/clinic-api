import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PolyDto } from 'src/dto/clinic/poly.dto';
import { UpdatePolyDto } from 'src/dto/clinic/update.poly.dto';
import { Poly } from 'src/entity/clinic/poly.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PolyService {
  constructor(
    @InjectRepository(Poly)
    private polyRepository: Repository<Poly>,
  ) {}

  async createPoly(PolyDto: PolyDto): Promise<Poly> {
    const poly = this.polyRepository.create(PolyDto);
    return this.polyRepository.save(poly);
  }

  async updatePoly(id: number, updatePolyDto: UpdatePolyDto): Promise<Poly> {
    await this.polyRepository.update(id, updatePolyDto);
    return this.polyRepository.findOne({ where: { id } });
  }

  async findOne(id: number): Promise<Poly> {
    return this.polyRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<Poly[]> {
    return this.polyRepository.find();
  }

  async removePoly(id: number): Promise<void> {
    await this.polyRepository.delete(id);
  }

  async getById(polyId: number): Promise<Poly | null> {
    return this.polyRepository.findOne({ where: { id: polyId } });
  }
}
