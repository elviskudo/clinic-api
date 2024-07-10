import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { LastRedeemService } from 'src/service/latest/last.redeem.service';
import { LastRedeemController } from 'src/controller/latest/last.redeem.controller';
import { PrismaModule } from 'src/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [LastRedeemService],
  controllers: [LastRedeemController],
})
export class LastRedeemModule {}
