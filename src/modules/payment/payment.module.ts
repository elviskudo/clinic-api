import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentController } from 'src/controller/payment/payment.controller';
import { Payment } from 'src/entity/payment/payment.entity';
import { User } from 'src/entity/profile/user.entity';
import { Role } from 'src/entity/role.entity';
import { PaymentService } from 'src/service/payment/payment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, User, Role])],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class paymentModule {}
