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

  async createBank(bankDto: BankDto): Promise<Partial<Bank>> {
    const bank = this.bankRepository.create(bankDto);
    const savedBank = await this.bankRepository.save(bank);
    return this.BankOutput(savedBank);
  }

  async updateBank(
    id: number,
    updateBankDto: UpdateBankDto,
  ): Promise<Partial<Bank>> {
    await this.bankRepository.update(id, updateBankDto);
    const updatedBank = await this.bankRepository.findOne({ where: { id } });
    return this.BankOutput(updatedBank);
  }

  async findOne(id: number): Promise<Partial<Bank>> {
    const bank = await this.bankRepository.findOne({ where: { id } });
    return this.BankOutput(bank);
  }

  async findAll(): Promise<Partial<Bank>[]> {
    const banks = await this.bankRepository.find();
    return banks.map((bank) => this.BankOutput(bank));
  }

  async removeBank(id: number): Promise<void> {
    await this.bankRepository.delete(id);
  }

  private BankOutput(bank: Bank): Partial<Bank> {
    const {
      bank_name,
      account_number,
      account_name,
      service_charge,
      handling_fee,
    } = bank;
    return {
      bank_name,
      account_number,
      account_name,
      service_charge,
      handling_fee,
    };
  }
}
