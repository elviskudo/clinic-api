import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentDetailsDto } from 'src/dto/payment/payment.details.dto';
import { UpdatePaymentDetailsDto } from 'src/dto/payment/update.payment.details.dto';
import { PaymentDetails } from 'src/entity/payment/payment.details.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentDetailsService {
  constructor(
    @InjectRepository(PaymentDetails)
    private paymentDetailsRepository: Repository<PaymentDetails>,
  ) {}

  async createPaymentDetails(
    paymentDetailsDto: PaymentDetailsDto,
  ): Promise<PaymentDetails> {
    const paymentDetails =
      this.paymentDetailsRepository.create(paymentDetailsDto);
    await this.paymentDetailsRepository.save(paymentDetails);
    return this.paymentDetailsRepository.findOne({
      where: { id: paymentDetails.id },
      relations: ['payment', 'drug', 'fee'],
    });
  }

  async updatePaymentDetails(
    id: number,
    updatePaymentDetailsDto: UpdatePaymentDetailsDto,
  ): Promise<PaymentDetails> {
    await this.paymentDetailsRepository.update(id, updatePaymentDetailsDto);
    return this.paymentDetailsRepository.findOne({
      where: { id },
      relations: ['payment', 'drug', 'fee'],
    });
  }

  async findOne(id: number): Promise<PaymentDetails> {
    return this.paymentDetailsRepository.findOne({
      where: { id },
      relations: ['payment', 'drug', 'fee'],
    });
  }

  async findAll(): Promise<PaymentDetails[]> {
    return this.paymentDetailsRepository.find({
      relations: ['payment', 'drug', 'fee'],
    });
  }

  async removePaymentDetails(id: number): Promise<void> {
    await this.paymentDetailsRepository.delete(id);
  }
}
