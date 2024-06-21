import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Term } from 'src/entity/term/term.entity';
import { TermDto } from 'src/dto/term/term.dto';
import { UpdateTermDto } from 'src/dto/term/update.term.dto';

@Injectable()
export class TermService {
  constructor(
    @InjectRepository(Term)
    private readonly termRepository: Repository<Term>,
  ) {}

  async createTerm(termDto: TermDto): Promise<Term> {
    const term = this.termRepository.create(termDto);
    return this.termRepository.save(term);
  }

  async updateTerm(id: number, updateTermDto: UpdateTermDto): Promise<Term> {
    await this.termRepository.update(id, updateTermDto);
    return this.termRepository.findOne({
      where: { id },
      relations: ['termCategory'],
    });
  }

  async findAll(): Promise<Term[]> {
    return this.termRepository.find({ relations: ['termCategory'] });
  }

  async findOne(id: number): Promise<Term> {
    return this.termRepository.findOne({
      where: { id },
      relations: ['termCategory'],
    });
  }

  async removeTerm(id: number): Promise<void> {
    await this.termRepository.delete(id);
  }
}
