import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeeDto } from 'src/dto/fee/fee.dto';
import { UpdateFeeDto } from 'src/dto/fee/update.fee.dto';
import { Fee } from 'src/entity/fee/fee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FeeService {
  constructor(
    @InjectRepository(Fee)
    private feeRepository: Repository<Fee>,
  ) {}

  async createFee(FeeDto: FeeDto): Promise<Fee> {
    const fee = this.feeRepository.create(FeeDto);
    await this.feeRepository.save(fee);
    return this.feeRepository.findOne({
      where: { id: fee.id },
      relations: ['clinic'],
    });
  }

  async updateFee(id: number, updateFeeDto: UpdateFeeDto): Promise<Fee> {
    await this.feeRepository.update(id, updateFeeDto);
    return this.feeRepository.findOne({ where: { id }, relations: ['clinic'] });
  }

  async findOne(id: number): Promise<Fee> {
    return this.feeRepository.findOne({ where: { id }, relations: ['clinic'] });
  }

  async findAll(): Promise<Fee[]> {
    return this.feeRepository.find({ relations: ['clinic'] });
  }

  async removeFee(id: number): Promise<void> {
    await this.feeRepository.delete(id);
  }
}
