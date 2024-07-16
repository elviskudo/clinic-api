import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TermDto } from 'src/dto/term/term.dto';
import { UpdateTermDto } from 'src/dto/term/update.term.dto';
import { TicketDto } from 'src/dto/term/ticket.dto';
import { ZodError, z } from 'zod';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class TermService {
  constructor(private prisma: PrismaService) {}

  async createTerm(termDto: TermDto) {
    const schema = z.object({
      term_category_id: z.string().min(1),
      title: z.string().min(1),
      content: z.string().min(1),
    });

    try {
      const validatedData = schema.parse(termDto);
      const create = await this.prisma.term.create({
        data: {
          term_category: {
            connect: {
              id: validatedData.term_category_id,
            },
          },
          title: validatedData.title,
          content: validatedData.content,
        },
        include: {
          term_category: true,
        },
      });

      return {
        status: true,
        message: 'Term successfully created',
        data: create,
      };
    } catch (e: any) {
      if (e instanceof ZodError) {
        const errorMessages = e.errors.map((error) => ({
          field: error.path.join('.'),
          message: error.message,
        }));

        return {
          status: false,
          message: 'Validation failed',
          data: errorMessages,
        };
      }
      return {
        status: false,
        message: e.message || 'An error occurred',
        data: null,
      };
    }
  }

  async updateTerm(id: string, updateTermDto: UpdateTermDto) {
    const schema = z.object({
      term_category_id: z.string().min(1),
      title: z.string().min(1),
      content: z.string().min(1),
    });

    try {
      const validatedData = schema.parse(updateTermDto);
      const update = await this.prisma.term.update({
        where: { id: id },
        data: {
          term_category: {
            connect: {
              id: validatedData.term_category_id,
            },
          },
          title: validatedData.title,
          content: validatedData.content,
        },
        include: {
          term_category: true,
        },
      });

      return {
        status: true,
        message: 'Term successfully updated',
        data: update,
      };
    } catch (e: any) {
      if (e instanceof ZodError) {
        const errorMessages = e.errors.map((error) => ({
          field: error.path.join('.'),
          message: error.message,
        }));

        return {
          status: false,
          message: 'Validation failed',
          data: errorMessages,
        };
      }
      return {
        status: false,
        message: e.message || 'An error occurred',
        data: null,
      };
    }
  }

  async findAll() {
    const terms = await this.prisma.term.findMany({
      include: {
        term_category: true,
      },
    });

    return {
      status: true,
      message: 'Terms successfully retrieved',
      data: terms,
    };
  }

  async findOne(id: string) {
    const term = await this.prisma.term.findUnique({
      where: { id: id },
      include: {
        term_category: true,
      },
    });

    if (term) {
      return {
        status: true,
        message: 'Term found',
        data: term,
      };
    } else {
      return {
        status: false,
        message: 'Term not found',
        data: null,
      };
    }
  }

  async removeTerm(id: string) {
    const deleteTerm = await this.prisma.term.delete({
      where: {
        id: id,
      },
    });

    if (deleteTerm) {
      return {
        status: true,
        message: 'Term successfully deleted',
        data: deleteTerm,
      };
    } else {
      return {
        status: false,
        message: 'Failed to delete term',
        data: null,
      };
    }
  }

  async sendTicket(ticketDto: TicketDto, token: string) {
    const schema = z.object({
      email: z.string().min(1),
      title: z.string().min(1),
      content: z.string().min(1),
    });

    try {
      const validatedData = schema.parse(ticketDto);
      const extracttoken = jwt.verify(token, process.env.JWT_SECRET);
      if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
        var userId = extracttoken.userId;
      }
      const create = await this.prisma.ticket.create({
        data: {
          user: {
            connect: {
              id: userId,
            },
          },
          title: validatedData.title,
          content: validatedData.content,
          email: validatedData.email,
        },
        include: {
          user: true,
        },
      });

      return {
        status: true,
        message: 'Ticket sent successfully',
        data: create,
      };
    } catch (e: any) {
      if (e instanceof ZodError) {
        const errorMessages = e.errors.map((error) => ({
          field: error.path.join('.'),
          message: error.message,
        }));

        return {
          status: false,
          message: 'Validation failed',
          data: errorMessages,
        };
      }
      return {
        status: false,
        message: e.message || 'An error occurred',
        data: null,
      };
    }
  }

  async findAllTickets() {
    const tickets = await this.prisma.ticket.findMany({
      include: {
        user: true,
      },
    });

    return {
      status: true,
      message: 'Tickets successfully retrieved',
      data: tickets,
    };
  }
}
