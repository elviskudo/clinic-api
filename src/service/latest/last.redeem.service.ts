import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as jwt from 'jsonwebtoken';
import { CreateDTO } from 'src/dto/redeem/create.dto';
import { ZodError, z } from 'zod';

@Injectable()
export class LastRedeemService {
  constructor(private readonly prisma: PrismaService) {}

  async getLastRedeem(token: string) {
    try {
      const extractToken = jwt.verify(token, process.env.JWT_SECRET);

      if (typeof extractToken !== 'string' && 'userId' in extractToken) {
        const userId = extractToken.userId;

        const redeem = await this.prisma.lastRedeem.findFirst({
          where: { user_id: userId },
          orderBy: { redemption_date_and_time: 'desc' },
          include: {
            bank: true,
            user: {
              include: {
                profile: {
                  include: {
                    city: true,
                    user: true,
                  },
                },
              },
            },
          },
        });

        if (redeem) {
          return {
            status: true,
            message: 'Last redeem record retrieved successfully',
            data: redeem,
          };
        } else {
          return {
            status: false,
            message: 'No redeem records found for this user',
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
      if (error instanceof Error && error.message) {
        return {
          status: false,
          message: error.message,
          data: null,
        };
      } else {
        return {
          status: false,
          message: 'Failed to retrieve last redeem record',
          data: null,
        };
      }
    }
  }

  async getRedeem(token: string) {
    try {
      const extractToken = jwt.verify(token, process.env.JWT_SECRET);

      if (typeof extractToken !== 'string' && 'userId' in extractToken) {
        const userId = extractToken.userId;

        const redeem = await this.prisma.lastRedeem.findMany({
          where: { user_id: userId },
          orderBy: { redemption_date_and_time: 'desc' },
          include: {
            bank: true,
            user: {
              include: {
                profile: {
                  include: {
                    city: true,
                    user: true,
                  },
                },
              },
            },
          },
        });

        if (redeem.length > 0) {
          return {
            status: true,
            message: 'Success to get data',
            data: redeem,
          };
        } else {
          return {
            status: false,
            message: 'No redeem records found for this user',
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
      if (error instanceof Error && error.message) {
        return {
          status: false,
          message: error.message,
          data: null,
        };
      } else {
        return {
          status: false,
          message: 'Failed to retrieve last redeem record',
          data: null,
        };
      }
    }
  }

  async findOneRedeem(token: string, id: string) {
    try {
      const extractToken = jwt.verify(token, process.env.JWT_SECRET);

      if (typeof extractToken !== 'string' && 'userId' in extractToken) {
        const userId = extractToken.userId;

        const redeem = await this.prisma.lastRedeem.findUnique({
          where: { id: id },
          include: {
            bank: true,
            user: {
              include: {
                profile: {
                  include: {
                    city: true,
                    user: true,
                  },
                },
              },
            },
          },
        });

        if (redeem) {
          return {
            status: true,
            message: 'Redeem record retrieved successfully',
            data: redeem,
          };
        } else {
          return {
            status: false,
            message: 'No redeem record found with this ID for this user',
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
      if (error instanceof Error && error.message) {
        return {
          status: false,
          message: error.message,
          data: null,
        };
      } else {
        return {
          status: false,
          message: 'Failed to retrieve last redeem record',
          data: null,
        };
      }
    }
  }

  async deleteRedeem(token: string, id: string) {
    try {
      const extractToken = jwt.verify(token, process.env.JWT_SECRET);

      if (typeof extractToken !== 'string' && 'userId' in extractToken) {
        const userId = extractToken.userId;

        const deleteResult = await this.prisma.lastRedeem.delete({
          where: { id: id },
        });

        if (deleteResult) {
          return {
            status: true,
            message: 'Redeem record deleted successfully',
            data: null,
          };
        } else {
          return {
            status: false,
            message: 'Failed to delete redeem record',
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
      if (error instanceof Error && error.message) {
        return {
          status: false,
          message: error.message,
          data: null,
        };
      } else {
        return {
          status: false,
          message: 'Failed to retrieve last redeem record',
          data: null,
        };
      }
    }
  }

  async createRedeem(token: string, data: CreateDTO) {
    const schema = z.object({
      redemption_date_and_time: z.string().min(1),
      list_of_medications: z.any(),
      total_cost: z.string().min(1),
      bank_transfer_name: z.string().min(1),
      bank_id: z.string().min(1),
    });
    try {
      const validatedData = schema.parse(data);
      const extracttoken = jwt.verify(token, process.env.JWT_SECRET);
      if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
        var userId = extracttoken.userId;
      }

      const list_of_medications = JSON.stringify(
        validatedData.list_of_medications,
      );

      const create = await this.prisma.lastRedeem.create({
        data: {
          redemption_date_and_time: validatedData.redemption_date_and_time,
          list_of_medications: list_of_medications,
          total_cost: validatedData.total_cost,
          bank_transfer_name: validatedData.bank_transfer_name,
          bank_id: validatedData.bank_id,
          user_id: userId,
        },
        include: {
          bank: true,
          user: {
            include: {
              profile: {
                include: {
                  city: true,
                  user: true,
                },
              },
            },
          },
        },
      });

      return {
        status: true,
        message: 'Success to create data',
        data: create,
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
        data: null,
      };
    }
  }

  async updateRedeem(token: string, data: CreateDTO, id: string) {
    const schema = z.object({
      redemption_date_and_time: z.string().min(1),
      list_of_medications: z.any(),
      total_cost: z.string().min(1),
      bank_transfer_name: z.string().min(1),
      bank_id: z.string().min(1),
    });
    try {
      const validatedData = schema.parse(data);
      const extracttoken = jwt.verify(token, process.env.JWT_SECRET);
      if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
        var userId = extracttoken.userId;
      }

      const find = await this.prisma.lastRedeem.findUnique({
        where: { id: id },
        include: {
          bank: true,
          user: {
            include: {
              profile: {
                include: {
                  city: true,
                  user: true,
                },
              },
            },
          },
        },
      });

      if (!find) {
        return {
          status: false,
          message: 'Data tidak ditemukan',
          data: null,
        };
      }

      const list_of_medications = JSON.stringify(
        validatedData.list_of_medications,
      );

      const update = await this.prisma.lastRedeem.update({
        where: {
          id: find.id,
        },
        data: {
          redemption_date_and_time: validatedData.redemption_date_and_time,
          list_of_medications: list_of_medications,
          total_cost: validatedData.total_cost,
          bank_transfer_name: validatedData.bank_transfer_name,
          bank_id: validatedData.bank_id,
          user_id: userId,
        },
        include: {
          bank: true,
          user: {
            include: {
              profile: {
                include: {
                  city: true,
                  user: true,
                },
              },
            },
          },
        },
      });

      return {
        status: true,
        message: 'Success to create data',
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
        data: null,
      };
    }
  }
}
