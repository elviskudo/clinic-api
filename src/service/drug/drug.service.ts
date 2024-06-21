import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Drug } from 'src/entity/drug/drug.entity';
import { DrugDto } from 'src/dto/drug/drug.dto';
import { UpdateDrugDto } from 'src/dto/drug/update.drug.dto';
import { format_json } from 'src/env';

@Injectable()
export class DrugService {
  constructor(
    @InjectRepository(Drug)
    private drugRepository: Repository<Drug>,
  ) {}

  private async findDrugByNameAndCompany(
    drug_name: string,
    company_name: string,
  ): Promise<Drug | undefined> {
    return this.drugRepository.findOne({
      where: { drug_name, company_name },
    });
  }

  async createDrug(drugDto: DrugDto): Promise<Drug> {
    const existingDrug = await this.findDrugByNameAndCompany(
      drugDto.drug_name,
      drugDto.company_name,
    );
    if (existingDrug) {
      throw new HttpException(
        format_json(
          400,
          false,
          'Bad Request',
          null,
          'Drug with this name and company already exists',
          null,
        ),
        400,
      );
    }
    const drug = this.drugRepository.create(drugDto);
    return this.drugRepository.save(drug);
  }

  async updateDrug(id: number, updateDrugDto: UpdateDrugDto): Promise<Drug> {
    await this.drugRepository.update(id, { ...updateDrugDto });
    return this.drugRepository.findOne({
      where: { id },
      relations: ['category'],
    });
  }

  async findOne(id: number): Promise<Drug> {
    return this.drugRepository.findOne({
      where: { id },
      relations: ['category'],
    });
  }

  async findAll(): Promise<Drug[]> {
    return this.drugRepository.find({ relations: ['category'] });
  }

  async removeDrug(id: number): Promise<void> {
    const result = await this.drugRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException(
        format_json(404, false, 'Not Found', null, 'Drug not found', null),
        404,
      );
    }
  }
}
