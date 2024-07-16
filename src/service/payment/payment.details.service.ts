import { Injectable, HttpException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PaymentDetailsDto } from 'src/dto/payment/payment.details.dto';
import { UpdatePaymentDetailsDto } from 'src/dto/payment/update.payment.details.dto';
import { ZodError, z } from 'zod';

@Injectable()
export class PaymentDetailsService {
  constructor(private prisma: PrismaService) {}

  async createPaymentDetails(
    paymentDetailsDto: PaymentDetailsDto,
  ): Promise<any> {
    const schema = z.object({
      payment_id: z.string().min(1),
      drug_id: z.string().min(1),
      quantity: z.number().int().nonnegative(),
      fee_id: z.string().min(1),
    });

    try {
      const validatedData = schema.parse(paymentDetailsDto);

      const paymentDetails = await this.prisma.paymentDetails.create({
        data: {
          payment_id: validatedData.payment_id,
          drug_id: validatedData.drug_id,
          quantity: validatedData.quantity,
          fee_id: validatedData.fee_id,
        },
        include: {
          payment: true,
          drug: true,
          fee: true,
        },
      });

      return {
        status: true,
        message: 'Data successfully created',
        data: paymentDetails,
      };
    } catch (e: any) {
      if (e instanceof ZodError) {
        const errorMessages = e.errors.map((error) => ({
          field: error.path.join('.'),
          message: error.message,
        }));

        return {
          status: false,
          message: 'Validasi gagal',
          data: errorMessages,
        };
      }
      return {
        status: false,
        message: e.message || 'Terjadi kesalahan',
      };
    }
  }

  async updatePaymentDetails(
    id: string,
    updatePaymentDetailsDto: UpdatePaymentDetailsDto,
  ): Promise<any> {
    const schema = z.object({
      payment_id: z.string().min(1).optional(),
      drug_id: z.string().min(1).optional(),
      quantity: z.number().int().nonnegative().optional(),
      fee_id: z.string().min(1).optional(),
    });

    try {
      const validatedData = schema.parse(updatePaymentDetailsDto);

      const update = await this.prisma.paymentDetails.update({
        where: { id: id },
        data: validatedData,
        include: {
          payment: {
            include: {
              bank: true,
              redeem: true,
            },
          },
          drug: true,
          fee: true,
        },
      });

      return {
        status: true,
        message: 'Data successfully updated',
        data: update,
      };
    } catch (e: any) {
      if (e instanceof ZodError) {
        const errorMessages = e.errors.map((error) => ({
          field: error.path.join('.'),
          message: error.message,
        }));

        return {
          status: false,
          message: 'Validasi gagal',
          data: errorMessages,
        };
      }
      return {
        status: false,
        message: e.message || 'Terjadi kesalahan',
      };
    }
  }

  async findOne(id: string): Promise<any> {
    const paymentDetails = await this.prisma.paymentDetails.findUnique({
      where: { id: id },
      include: {
        payment: {
          include: {
            bank: true,
            redeem: true,
          },
        },
        drug: true,
        fee: true,
      },
    });

    if (!paymentDetails) {
      throw new HttpException('PaymentDetails not found', 404);
    }

    return {
      status: true,
      message: 'Data found',
      data: paymentDetails,
    };
  }

  async findAll(): Promise<any> {
    const paymentDetails = await this.prisma.paymentDetails.findMany({
      include: {
        payment: {
          include: {
            bank: true,
            redeem: true,
          },
        },
        drug: true,
        fee: true,
      },
    });

    return {
      status: true,
      message: 'Data found',
      data: paymentDetails,
    };
  }

  async removePaymentDetails(id: string): Promise<any> {
    try {
      await this.prisma.paymentDetails.delete({
        where: { id: id },
      });

      return {
        status: true,
        message: 'Data successfully deleted',
      };
    } catch (e: any) {
      throw new HttpException('PaymentDetails not found', 404);
    }
  }
}
