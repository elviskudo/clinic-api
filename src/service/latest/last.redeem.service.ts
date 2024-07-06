import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import { LastRedeemDto } from 'src/dto/latest/last.redeem.dto';
import { LastRedeem } from 'src/entity/latest/last.redeem.entity';
import { CreateDTO } from 'src/dto/redeem/create.dto';

@Injectable()
export class LastRedeemService {
  constructor(
    @InjectRepository(LastRedeem)
    private readonly lastRedeemRepository: Repository<LastRedeem>,
    private readonly jwtService: JwtService,
  ) {}

  async getLastRedeem(token: string) {
    const extracttoken = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
      const userId = extracttoken.userId;

      const redeem = await this.lastRedeemRepository.findOne({
        where: { user_id: userId },
        order: { redemption_date_and_time: 'DESC' },
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
  }

  async getRedeem(token: string) {
    const extracttoken = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
      const userId = extracttoken.userId;

      const redeem = await this.lastRedeemRepository.find({
        relations: ['bank', 'profile'],
        order: { redemption_date_and_time: 'DESC' },
      });

      if (redeem) {
        const result = redeem.map((redeem) => ({
          id: redeem.id,
          redemption_date_and_time: redeem.redemption_date_and_time,
          list_of_medications: redeem.list_of_medications,
          total_cost: redeem.total_cost,
          bank_transfer_name: redeem.bank_transfer_name,
          bank_id: redeem.bank_id,
          bank: redeem.bank,
          user_id: redeem.user_id,
          user: redeem.profile,
        }));

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
  }
  s;
  async findOneRedeem(token: string, id: number) {
    const extracttoken = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
      const userId = extracttoken.userId;

      const redeem = await this.lastRedeemRepository.findOne({
        relations: ['bank', 'profile'],
        where: { id: id },
      });

      if (redeem) {
        return {
          status: true,
          message: 'Redeem record retrieved successfully',
          data: {
            id: redeem.id,
            redemption_date_and_time: redeem.redemption_date_and_time,
            list_of_medications: redeem.list_of_medications,
            total_cost: redeem.total_cost,
            bank_transfer_name: redeem.bank_transfer_name,
            bank_id: redeem.bank_id,
            bank: redeem.bank,
            user_id: redeem.user_id,
            user: redeem.profile,
          },
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
  }

  async updateLastRedeem(token: string, updateRedeemDto: LastRedeemDto) {
    const extracttoken = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
      const userId = extracttoken.userId;

      const newRedeem = this.lastRedeemRepository.create({
        ...updateRedeemDto,
        user_id: userId,
      });

      await this.lastRedeemRepository.save(newRedeem);

      return {
        status: true,
        message: 'Redeem record created successfully',
        data: newRedeem,
      };
    } else {
      return {
        status: false,
        message: 'Invalid token',
        data: null,
      };
    }
  }

  async createRedeem(token: string, data: CreateDTO) {
    const extracttoken = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
      const userId = extracttoken.userId;

      const create = this.lastRedeemRepository.create({
        redemption_date_and_time: data.redemption_date_and_time,
        list_of_medications: data.list_of_medications,
        total_cost: data.total_cost,
        bank_transfer_name: data.bank_transfer_name,
        bank_id: data.bank_id,
        user_id: userId,
      });

      if (create) {
        return {
          status: true,
          message: 'Data sucess to create',
          data: create,
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

  async updateRedeem(token: string, data: CreateDTO, id: number) {
    const extracttoken = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
      const userId = extracttoken.userId;

      const redeem = await this.lastRedeemRepository.findOne({
        where: { id: id },
      });

      if (!redeem) {
        return {
          status: false,
          message: 'Redeem not found',
          data: null,
        };
      }

      redeem.bank_id = data.bank_id;
      redeem.list_of_medications = JSON.stringify(data.list_of_medications);
      redeem.bank_transfer_name = data.bank_transfer_name;
      redeem.redemption_date_and_time = data.redemption_date_and_time;
      redeem.total_cost = data.total_cost;

      const update = await this.lastRedeemRepository.save(redeem);

      if (update) {
        return {
          status: true,
          message: 'Data successfully updated',
          data: update,
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

  async deleteRedeem(token: string, id: number) {
    const extracttoken = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
      const userId = extracttoken.userId;

      const deletedata = await this.lastRedeemRepository.delete(id);

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
