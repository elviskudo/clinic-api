import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { RoleController } from 'src/controller/role.controller';
import { RoleService } from 'src/service/role.service';
import { Role } from 'src/entity/role.entity';
import { RolesGuard } from 'src/middleware/role.guard';
import { User } from 'src/entity/profile/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role,User])],
  controllers: [RoleController],
  providers: [
    RoleService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class RoleModule {}
