import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TermController } from 'src/controller/term/term.controller';
import { Term } from 'src/entity/term/term.entity';
import { Ticket } from 'src/entity/term/ticket.entity';
import { TermService } from 'src/service/term/term.service';
import { Authmodule } from '../auth/auth.module';
import { User } from 'src/entity/profile/user.entity';
import { Role } from 'src/entity/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Term, Ticket, User, Role]), Authmodule],
  providers: [TermService],
  controllers: [TermController],
})
export class TermModule {}
