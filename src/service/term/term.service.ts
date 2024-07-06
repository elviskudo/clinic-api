import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Term } from 'src/entity/term/term.entity';
import { TermDto } from 'src/dto/term/term.dto';
import { UpdateTermDto } from 'src/dto/term/update.term.dto';
import { Ticket } from 'src/entity/term/ticket.entity';
import { TicketDto } from 'src/dto/term/ticket.dto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class TermService {
  constructor(
    @InjectRepository(Term)
    private readonly termRepository: Repository<Term>,
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    private readonly authService: AuthService,
  ) {}

  async createTerm(termDto: TermDto): Promise<Term> {
    const term = this.termRepository.create(termDto);
    return this.termRepository.save(term);
  }

  async updateTerm(id: number, updateTermDto: UpdateTermDto): Promise<Term> {
    await this.termRepository.update(id, updateTermDto);
    return this.termRepository.findOne({
      where: { id },
      relations: ['term_category'],
    });
  }

  async findAll(): Promise<Term[]> {
    return this.termRepository.find({ relations: ['term_category'] });
  }

  async findOne(id: number): Promise<Term> {
    return this.termRepository.findOne({
      where: { id },
      relations: ['term_category'],
    });
  }

  async removeTerm(id: number): Promise<void> {
    await this.termRepository.delete(id);
  }

  async sendTicket(ticketDto: TicketDto, userId: number): Promise<Ticket> {
    const { title, content } = ticketDto;

    const user = await this.authService.getAuthById(userId);

    const ticket = new Ticket();
    ticket.user_id = user.id;
    ticket.email = user.email;
    ticket.title = title;
    ticket.content = content;

    return this.ticketRepository.save(ticket);
  }

  async findAllTickets(): Promise<Ticket[]> {
    return this.ticketRepository.find();
  }
}
