import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as jwt from 'jsonwebtoken';
import { paymentDTO } from 'src/dto/payment/payment.dto';
import { ZodError, z } from 'zod';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async getdata(token: string) {
    const extracttoken = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
      const userId = extracttoken.userId;

      const profile = await this.prisma.profile.findUnique({
        where: { user_id: userId },
      });

      if (!profile) {
        return {
          status: false,
          message: 'Profile tidak ditemukan',
          data: null,
        };
      }

      try {
        const payments = await this.prisma.payment.findMany({
          where: { user_id: profile.id },
          include: {
            bank: {
              include: {
                bank_category: true,
              },
            },
            redeem: {
              include: {
                drug: true,
              },
            },
          },
        });

        if (payments.length > 0) {
          const formattedPayments = payments.map((payment) => ({
            id: payment.id,
            payment_name: payment.payment_name,
            bank: payment.bank,
            redeem: {
              redeem_id: payment.redeem_id,
              drugs: payment.redeem?.drug.map((drug) => ({
                id: drug.id,
                name: drug.drug_name,
                price: Number(drug.sell_price),
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
      } catch (error) {
        return {
          status: false,
          message: 'Failed to retrieve data',
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
    const schema = z.object({
      payment_name: z.string().min(1),
      bank_id: z.string().min(1),
      redeem_id: z.string().min(1),
    });

    try {
      const validatedData = schema.parse(data);
      const extracttoken = jwt.verify(token, process.env.JWT_SECRET);
      if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
        const userId = extracttoken.userId;

        const profile = await this.prisma.profile.findUnique({
          where: { user_id: userId },
        });

        if (!profile) {
          return {
            status: false,
            message: 'Profile tidak ditemukan',
            data: null,
          };
        }

        const create = await this.prisma.payment.create({
          data: {
            payment_name: validatedData.payment_name,
            bank_id: validatedData.bank_id,
            redeem_id: validatedData.redeem_id,
            status: 'Pending',
            user_id: profile.id,
          },
          include: {
            bank: {
              include: {
                bank_category: true,
              },
            },
            redeem: {
              include: {
                drug: true,
              },
            },
          },
        });

        const serializedResult = {
          ...create,
          redeem: {
            ...create.redeem,
            drug: create.redeem.drug.map((drug) => ({
              ...drug,
              sell_price: Number(drug.sell_price),
            })),
          },
        };

        return {
          status: true,
          message: 'Data successfully created',
          data: serializedResult,
        };
      } else {
        return {
          status: false,
          message: 'Invalid token',
          data: null,
        };
      }
    } catch (e: any) {
      if (e instanceof ZodError) {
        const errorMessages = e.errors.map((error) => ({
          field: error.path.join('.'),
          message: error.message,
        }));

        return {
          status: false,
          message: 'Validation failed',
          data: errorMessages,
        };
      }
      return {
        status: false,
        message: e.message || 'An error occurred',
      };
    }
  }

  async update(token: string, data: paymentDTO, id: string) {
    const schema = z.object({
      payment_name: z.string().min(1).optional(),
      bank_id: z.string().min(1).optional(),
      redeem_id: z.string().min(1).optional(),
    });

    try {
      const validatedData = schema.parse(data);
      const extracttoken = jwt.verify(token, process.env.JWT_SECRET);

      if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
        const userId = extracttoken.userId;

        const payment = await this.prisma.payment.findUnique({
          where: { id: id },
          include: {
            bank: {
              include: {
                bank_category: true,
              },
            },
            redeem: {
              include: {
                drug: true,
              },
            },
          },
        });

        if (!payment) {
          return {
            status: false,
            message: 'Payment not found',
            data: null,
          };
        }

        const update = await this.prisma.payment.update({
          where: { id: id },
          data: validatedData,
          include: {
            bank: {
              include: {
                bank_category: true,
              },
            },
            redeem: {
              include: {
                drug: true,
              },
            },
          },
        });

        const serializedResult = {
          ...update,
          redeem: {
            ...update.redeem,
            drug: update.redeem.drug.map((drug) => ({
              ...drug,
              sell_price: Number(drug.sell_price),
            })),
          },
        };

        return {
          status: true,
          message: 'Data successfully updated',
          data: serializedResult,
        };
      } else {
        return {
          status: false,
          message: 'Invalid token',
          data: null,
        };
      }
    } catch (e: any) {
      if (e instanceof ZodError) {
        const errorMessages = e.errors.map((error) => ({
          field: error.path.join('.'),
          message: error.message,
        }));

        return {
          status: false,
          message: 'Validation failed',
          data: errorMessages,
        };
      }
      return {
        status: false,
        message: e.message || 'An error occurred',
      };
    }
  }

  async delete(token: string, id: string) {
    const extracttoken = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
      const userId = extracttoken.userId;

      try {
        await this.prisma.payment.delete({
          where: { id: id },
        });

        return {
          status: true,
          message: 'Data successfully deleted',
        };
      } catch (e: any) {
        return {
          status: false,
          message: 'Payment not found',
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
