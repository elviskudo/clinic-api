import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentDetailsController } from 'src/controller/payment/payment.details.controller';
import { PrismaModule } from 'src/prisma.module';
import { PaymentDetailsService } from 'src/service/payment/payment.details.service';

@Module({
  imports: [PrismaModule],
  providers: [PaymentDetailsService],
  controllers: [PaymentDetailsController],
})
export class PaymentDetailsModule {}
