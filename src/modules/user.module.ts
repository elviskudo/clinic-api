import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/profile/user.entity';
import { UserController } from 'src/controller/user.controller';
import { UserService } from 'src/service/user.service';
import { ProfileConfiguration } from 'src/entity/profile_config/profile.config.entity';
import { Profile } from 'src/entity/profile/profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User,ProfileConfiguration, Profile])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
