import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BankDto } from 'src/dto/bank/bank.dto';
import { UpdateBankDto } from 'src/dto/bank/update.bank.dto';
import { Bank } from 'src/entity/bank/bank.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BankService {
  constructor(
    @InjectRepository(Bank)
    private bankRepository: Repository<Bank>,
  ) {}

  async createBank(bankDto: BankDto): Promise<Bank> {
    const bank = this.bankRepository.create(bankDto);
    return this.bankRepository.save(bank);
  }

  async updateBank(
    id: number,
    updateBankDto: UpdateBankDto,
  ): Promise<Partial<Bank>> {
    await this.bankRepository.update(id, updateBankDto);
    return this.bankRepository.findOne({
      where: { id },
      relations: ['bank_category'],
    });
  }

  async findOne(id: number): Promise<Partial<Bank>> {
    return this.bankRepository.findOne({
      where: { id },
      relations: ['bank_category'],
    });
  }

  async findAll(): Promise<Partial<Bank>[]> {
    return this.bankRepository.find({ relations: ['bank_category'] });
  }

  async removeBank(id: number): Promise<boolean> {
    const deleteResult = await this.bankRepository.delete(id);
    return deleteResult.affected > 0;
  }
}
