import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { paymentController } from 'src/controller/payment/payment.controller';
import { Payment } from 'src/entity/payment/payment.entity';
import { User } from 'src/entity/profile/user.entity';
import { PaymentService } from 'src/service/payment/payment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, User])],
  controllers: [paymentController],
  providers: [PaymentService],
})
export class paymentModule {}
