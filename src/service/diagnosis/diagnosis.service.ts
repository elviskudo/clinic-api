import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { DiagnosisEntity } from 'src/entity/diagnosis.entity';
import { DiagnosisDTO } from 'src/dto/diagnosis.dto';

@Injectable()
export class DiagnosisService {
  constructor(
    @InjectRepository(DiagnosisEntity)
    private readonly diagnosisReposity: Repository<DiagnosisEntity>,
  ) {}

  async getdata(token: string) {
    const extracttoken = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
      const userId = extracttoken.userId;

      const diagnosis = await this.diagnosisReposity.find({
        relations: ['profile'],
        where: { user_id: userId }
      });

      if (diagnosis.length > 0) {

        const result = diagnosis.map(diagnosis => ({
            user_id : diagnosis.user_id,
            user : diagnosis.profile,
            deaseas_name : diagnosis.deaseas_name
          }));

        return {
          status: true,
          message: 'Success to get data',
          data: result,
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


  async create(token: string, data: DiagnosisDTO) {
    try {
        const extracttoken = jwt.verify(token, process.env.JWT_SECRET);
        if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
      
      const userId = extracttoken.userId;
      
      const create = this.diagnosisReposity.create({
        user_id: userId,
        deaseas_name: data.deaseas_name
      });

      const saved = await this.diagnosisReposity.save(create);

      
      if (saved) {
        return {
          status: true,
          message: 'Data successfully created',
          data: create,
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

async update(token: string, id: number, data: DiagnosisDTO) {
    try {
        const extracttoken = jwt.verify(token, process.env.JWT_SECRET);

        if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
            const userId = extracttoken.userId;

            const diagnosis = await this.diagnosisReposity.findOne({
                where: { id: id },
                relations: ['profile']
            });

            if (!diagnosis) {
                return {
                    status: false,
                    message: 'Diagnosis not found',
                    data: null,
                };
            }

            diagnosis.deaseas_name = data.deaseas_name;
            const saved = await this.diagnosisReposity.save(diagnosis);
            if (saved) {
                return {
                    status: true,
                    message: 'Data successfully updated',
                    data: {
                        user_id: diagnosis.user_id,
                        user: diagnosis.profile,
                        diagnosis: diagnosis.deaseas_name
                    },
                };
            } else {
                return {
                    status: false,
                    message: 'Failed to save updated data',
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
        console.error('Error updating diagnosis:', error);
        return {
            status: false,
            message: 'An error occurred while updating the diagnosis',
            data: null,
        };
    }
}

async delete(token: string, id:number) {
    try {
        const extracttoken = jwt.verify(token, process.env.JWT_SECRET);
        if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
      
      const userId = extracttoken.userId;

      const saved = await this.diagnosisReposity.delete(id);

      
      if (saved) {
        return {
          status: true,
          message: 'Data successfully deleted',
          data: null,
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
