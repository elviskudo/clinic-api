import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { Payment } from 'src/entity/payment/payment.entity';
import { paymentDTO } from 'src/dto/payment/payment.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async getdata(token: string) {
    const extracttoken = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
      const userId = extracttoken.userId;

      const payments = await this.paymentRepository.find({
        relations: ['bank', 'LastRedeem', 'LastRedeem.drugs'],
      });

      if (payments.length > 0) {
        const formattedPayments = payments.map((payment) => ({
          id: payment.id,
          payment_name: payment.payment_name,
          bank: payment.bank,
          redeem: {
            redeem_id: payment.redeem_id,
            drugs: payment.LastRedeem?.drugs.map((drug) => ({
              id: drug.id,
              name: drug.drug_name,
              price: drug.sell_price,
            })),
          },
          status: payment.status,
        }));

        return {
          status: true,
          message: 'Success to get data',
          data: formattedPayments,
        };
      } else {
        return {
          status: false,
          message: 'No payment records found for this user',
          data: null,
        };
      }
    } else {
      return {
        status: false,
        message: 'Invalid token',
        data: null,
      };
    }
  }

  async createpayment(token: string, data: paymentDTO) {
    try {
      const extracttoken = jwt.verify(token, process.env.JWT_SECRET);
      if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
        const userId = extracttoken.userId;

        const create = this.paymentRepository.create({
          payment_name: data.payment_name,
          bank_id: data.bank_id,
          redeem_id: data.redeem_id,
          status: 'Pending',
        });

        const savedPayment = await this.paymentRepository.save(create);

        if (savedPayment) {
          const paymentData = await this.paymentRepository.findOne({
            where: { id: create.id },
            relations: ['bank', 'LastRedeem', 'LastRedeem.drugs'],
          });

          return {
            status: true,
            message: 'Data successfully created',
            data: paymentData,
          };
        } else {
          return {
            status: false,
            message: 'Data cannot be used',
            data: null,
          };
        }
      } else {
        return {
          status: false,
          message: 'Invalid token',
          data: null,
        };
      }
    } catch (error) {
      return { status: false, message: error.message, data: null };
    }
  }

  async update(token: string, data: paymentDTO, id: number) {
    const extracttoken = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
      const userId = extracttoken.userId;

      const payment = await this.paymentRepository.findOne({
        where: { id: id },
        relations: ['bank', 'LastRedeem', 'LastRedeem.drugs'],
      });

      if (!payment) {
        return {
          status: false,
          message: 'payment not found',
          data: null,
        };
      }

      payment.payment_name = data.payment_name;
      payment.bank_id = data.bank_id;
      payment.redeem_id = data.redeem_id;

      const update = await this.paymentRepository.save(payment);

      if (update) {
        const paymentget = await this.paymentRepository.findOne({
          where: { id: payment.id },
          relations: ['bank', 'LastRedeem', 'LastRedeem.drugs'],
        });
        return {
          status: true,
          message: 'Data successfully updated',
          data: paymentget,
        };
      } else {
        return {
          status: false,
          message: 'System Errors',
          data: null,
        };
      }
    } else {
      return {
        status: false,
        message: 'Invalid token',
        data: null,
      };
    }
  }

  async delete(token: string, id: number) {
    const extracttoken = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
      const userId = extracttoken.userId;

      const deletedata = await this.paymentRepository.delete(id);

      if (deletedata) {
        return {
          status: true,
          message: 'Data sucess to deleted',
          data: null,
        };
      } else {
        return {
          status: false,
          message: 'System Errors',
          data: null,
        };
      }
    } else {
      return {
        status: false,
        message: 'Invalid token',
        data: null,
      };
    }
  }
}
