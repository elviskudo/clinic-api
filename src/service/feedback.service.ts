import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { Feedback } from 'src/entity/feedback.entity';
import { FeedbackDTO } from 'src/dto/feedback.dto';


@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private readonly feedbackReposity: Repository<Feedback>,
  ) {}

  async getdata(token: string) {
    const extracttoken = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
      const userId = extracttoken.userId;

      const feedback = await this.feedbackReposity.find({
        relations: ['profile']
      });

      if (feedback.length > 0) {

        const result = feedback.map(feedback => ({
            user_id : feedback.user_id,
            user : feedback.profile,
            content : feedback.content
          }));

        return {
          status: true,
          message: 'Success to get data',
          data: result,
        };
      } else {
        return {
          status: false,
          message: 'No feedback records found for this user',
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


  async create(token: string, data: FeedbackDTO) {
    try {
        const extracttoken = jwt.verify(token, process.env.JWT_SECRET);
        if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
      
      const userId = extracttoken.userId;
      
      const create = this.feedbackReposity.create({
        user_id: userId,
        content: data.content
      });

      const saved = await this.feedbackReposity.save(create);

      
      if (saved) {
        const getfeedback = await this.feedbackReposity.findOne({
          where: { id: create.id },
          relations: ['profile']
        });
        return {
          status: true,
          message: 'Data successfully created',
          data: getfeedback,
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
