import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedeemController } from 'src/controller/redeem/redeem.controller';
import { LastRedeemService } from 'src/service/latest/last.redeem.service';
import { PrismaModule } from 'src/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RedeemController],
  providers: [LastRedeemService],
})
export class RedeemModule {}
