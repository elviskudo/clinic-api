import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TermCategoryDto } from 'src/dto/term/term.category.dto';
import { UpdateTermCategoryDto } from 'src/dto/term/update.term.category.dto';
import { TermCategory } from 'src/entity/term/term.category.entity';

@Injectable()
export class TermCategoryService {
  constructor(
    @InjectRepository(TermCategory)
    private termCategoryRepository: Repository<TermCategory>,
  ) {}

  async createTermCategory(
    termCategoryDto: TermCategoryDto,
  ): Promise<TermCategory> {
    const termCategory = this.termCategoryRepository.create(termCategoryDto);
    return this.termCategoryRepository.save(termCategory);
  }

  async updateTermCategory(
    id: number,
    updateTermCategoryDto: UpdateTermCategoryDto,
  ): Promise<TermCategory> {
    await this.termCategoryRepository.update(id, updateTermCategoryDto);
    return this.termCategoryRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<TermCategory[]> {
    return this.termCategoryRepository.find();
  }

  async findOne(id: number): Promise<TermCategory> {
    return this.termCategoryRepository.findOne({ where: { id } });
  }

  async removeTermCategory(id: number): Promise<void> {
    await this.termCategoryRepository.delete(id);
  }
}
