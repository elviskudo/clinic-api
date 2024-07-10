import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentController } from 'src/controller/payment/payment.controller';
import { PrismaModule } from 'src/prisma.module';
import { PaymentService } from 'src/service/payment/payment.service';

@Module({
  imports: [PrismaModule],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class paymentModule {}
