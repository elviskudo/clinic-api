import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feedback } from 'src/entity/feedback.entity';
import { FeedbackController } from 'src/controller/feedback.controller';
import { FeedbackService } from 'src/service/feedback.service';
import { User } from 'src/entity/profile/user.entity';
import { Role } from 'src/entity/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Feedback, User, Role])],
  controllers: [FeedbackController],
  providers: [FeedbackService],
})
export class FeedbackModule {}
