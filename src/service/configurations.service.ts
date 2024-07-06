import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { configurations } from 'src/entity/configurations.entity';
import { configurationsDTO } from 'src/dto/configurations.dto';


@Injectable()
export class configurationsService {
  constructor(
    @InjectRepository(configurations)
    private readonly configurationsReposity: Repository<configurations>,
  ) {}

  async getdata(token: string) {
    const extracttoken = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
      const userId = extracttoken.userId;

      const feedback = await this.configurationsReposity.findOne({ where: { id: 1 }});

      if (feedback) {
        return {
          status: true,
          message: 'Success to get data',
          data: feedback,
        };
      } else {
        return {
          status: false,
          message: 'no configurasion records found for this user',
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


  async update(token: string, data: configurationsDTO) {
    try {
        const extracttoken = jwt.verify(token, process.env.JWT_SECRET);
        if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
      
      const userId = extracttoken.userId;
      
      const feedback = await this.configurationsReposity.update(1,data);

      const result = await this.configurationsReposity.findOne({ where: { id: 1 }});

      
      if (feedback) {
        return {
          status: true,
          message: 'Data successfully updated',
          data: result,
        };
      } else {
        return {
          status: false,
          message: 'Data tidak bisa di gunakan',
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

}
