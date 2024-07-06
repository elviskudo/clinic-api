import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SymptomDto } from 'src/dto/symptom/symptom.dto';
import { UpdateSymptomDto } from 'src/dto/symptom/update.symptom.dto';
import { Symptom } from 'src/entity/symptom.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SymptomService {
  constructor(
    @InjectRepository(Symptom)
    private symptomRepository: Repository<Symptom>,
  ) {}

  async createSymptom(symptomDto: SymptomDto): Promise<Symptom> {
    const symptom = this.symptomRepository.create(symptomDto);
    return this.symptomRepository.save(symptom);
  }

  async updateSymptom(
    id: number,
    updateSymptomDto: UpdateSymptomDto,
  ): Promise<Symptom> {
    await this.symptomRepository.update(id, updateSymptomDto);
    return this.symptomRepository.findOne({ where: { id } });
  }

  async findOne(id: number) {
    const get = await this.symptomRepository.findOne({
      where: { id },
      relations: ['poly'],
    });

    return {
      id: get.id,
      name: get.name,
      description: get.description,
      poly_id: get.poly_id,
      poly: get.poly,
    };
  }

  async findAll() {
    const get = await this.symptomRepository.find({
      relations: ['poly'],
    });

    const result = get.map((get) => ({
      id: get.id,
      name: get.name,
      description: get.description,
      poly_id: get.poly_id,
      poly: get.poly,
    }));

    return result;
  }

  async removeSymptom(id: number): Promise<void> {
    await this.symptomRepository.delete(id);
  }

  async getById(symptomId: number): Promise<Symptom | null> {
    return this.symptomRepository.findOne({ where: { id: symptomId } });
  }
}
