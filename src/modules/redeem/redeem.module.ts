import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/profile/user.entity';
import { LastRedeem } from 'src/entity/latest/last.redeem.entity';
import { RedeemController } from 'src/controller/redeem/redeem.controller';
import { LastRedeemService } from 'src/service/latest/last.redeem.service';
import { Role } from 'src/entity/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LastRedeem, User, Role])],
  controllers: [RedeemController],
  providers: [LastRedeemService],
})
export class RedeemModule {}
