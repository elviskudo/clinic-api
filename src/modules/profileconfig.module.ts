import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiagnosisController } from 'src/controller/diagnosis/diagnosis.controller';
import { SettingsController } from 'src/controller/profile_config/profile.config.controller';
import { PrismaModule } from 'src/prisma.module';
import { DiagnosisService } from 'src/service/diagnosis/diagnosis.service';
import { ProfileConfigurationService } from 'src/service/profile_config/profile.config.service';

@Module({
  imports: [PrismaModule],
  controllers: [SettingsController],
  providers: [ProfileConfigurationService],
})
export class ProfileModule {}
