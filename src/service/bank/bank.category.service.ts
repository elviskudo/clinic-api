import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BankCategoryDto } from 'src/dto/bank/bank.category.dto';
import { UpdateBankCategoryDto } from 'src/dto/bank/update.bank.category.dto';
import { BankCategory } from 'src/entity/bank/bank.category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BankCategoryService {
  constructor(
    @InjectRepository(BankCategory)
    private bankCategoryRepository: Repository<BankCategory>,
  ) {}

  async createBankCategory(
    bankCategoryDto: BankCategoryDto,
  ): Promise<BankCategory> {
    const bankCategory = this.bankCategoryRepository.create(bankCategoryDto);
    return this.bankCategoryRepository.save(bankCategory);
  }

  async updateBankCategory(
    id: number,
    updateBankCategoryDto: UpdateBankCategoryDto,
  ): Promise<BankCategory> {
    await this.bankCategoryRepository.update(id, updateBankCategoryDto);
    return this.bankCategoryRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<BankCategory[]> {
    return this.bankCategoryRepository.find();
  }

  async findOne(id: number): Promise<BankCategory> {
    return this.bankCategoryRepository.findOne({ where: { id } });
  }

  async removeBankCategory(id: number): Promise<boolean> {
    const deleteResult = await this.bankCategoryRepository.delete(id);
    return deleteResult.affected > 0;
  }
}
