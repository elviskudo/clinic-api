import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentDetailsController } from 'src/controller/payment/payment.details.controller';
import { Drug } from 'src/entity/drug/drug.entity';
import { Fee } from 'src/entity/fee/fee.entity';
import { PaymentDetails } from 'src/entity/payment/payment.details.entity';
import { Payment } from 'src/entity/payment/payment.entity';
import { PaymentDetailsService } from 'src/service/payment/payment.details.service';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentDetails, Payment, Drug, Fee])],
  providers: [PaymentDetailsService],
  controllers: [PaymentDetailsController],
})
export class PaymentDetailsModule {}
