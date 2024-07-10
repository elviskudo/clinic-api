import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma.module';
import { AuthenticationService } from 'src/service/auth/authentication.service'; 
import { ProfileService } from 'src/service/auth/profile.service'; 
import { mailService } from 'src/service/mailer/mailer.service';

@Module({
  imports: [PrismaModule],
  providers: [
    AuthenticationService,
    ProfileService,
    mailService, 
  ],
  exports: [AuthenticationService, ProfileService], 
})
export class Authmodule {}
