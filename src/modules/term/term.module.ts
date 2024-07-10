import { Module } from '@nestjs/common';
import { TermController } from 'src/controller/term/term.controller';
import { TermService } from 'src/service/term/term.service';
import { PrismaModule } from 'src/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [TermService],
  controllers: [TermController],
})
export class TermModule {}
