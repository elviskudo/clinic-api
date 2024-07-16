import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Res,
  HttpStatus,
  UsePipes,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Response } from 'express';
import { CustomValidationPipe } from 'src/custom-validation.pipe';
import { TermDto } from 'src/dto/term/term.dto';
import { TicketDto } from 'src/dto/term/ticket.dto';
import { UpdateTermDto } from 'src/dto/term/update.term.dto';
import { format_json } from 'src/env';
import { TermService } from 'src/service/term/term.service';
import { Roles } from 'src/middleware/role.decorator';
import { RolesGuard } from 'src/middleware/role.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Term and tickets')
@ApiSecurity('bearer')
@ApiBearerAuth()
@Controller('api/terms')
export class TermController {
  constructor(private readonly termService: TermService) {}

  @Get('tickets')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'manager', 'operator')
  @ApiOperation({ summary: 'Get ticket' })
  @ApiResponse({
    status: 201,
    description: 'Success',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        title: { type: 'string' },
        content: { type: 'string' },
        term_category: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
          },
        },
      },
    },
  })
  async findAllTickets(@Res() res: Response) {
    try {
      const tickets = await this.termService.findAllTickets();
      return res
        .status(200)
        .json(
          format_json(
            200,
            true,
            null,
            null,
            'Tickets retrieved successfully',
            tickets,
          ),
        );
    } catch (error: any) {
      return res
        .status(400)
        .json(
          format_json(
            500,
            false,
            null,
            error || error,
            'Server Error',
            error.message,
          ),
        );
    }
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UsePipes(CustomValidationPipe)
  @Roles('admin', 'manager', 'operator')
  @ApiOperation({ summary: 'Create Term' })
  @ApiResponse({
    status: 201,
    description: 'Term created successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        title: { type: 'string' },
        content: { type: 'string' },
        term_category: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
          },
        },
      },
    },
  })
  async create(@Body() termDto: TermDto, @Res() res: Response) {
    try {
      const createdTerm = await this.termService.createTerm(termDto);
      if (createdTerm.status) {
        return res.status(200).json(
          format_json(200, true, null, null, createdTerm.message, createdTerm.data)
        );
      } else {
        return res.status(400).json(
          format_json(400, false, null, createdTerm.data, 'Error Server', null)
        );
      }
    } catch (error: any) {
      return res
        .status(400)
        .json(
          format_json(
            500,
            false,
            null,
            error || error,
            'Server Error',
            error.message,
          ),
        );
    }
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UsePipes(CustomValidationPipe)
  @Roles('admin', 'manager', 'operator')
  @ApiOperation({ summary: 'Update term' })
  @ApiResponse({
    status: 200,
    description: 'Term updated successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        title: { type: 'string' },
        content: { type: 'string' },
        term_category: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
          },
        },
      },
    },
  })
  async update(
    @Param('id') id: string,
    @Body() updateTermDto: UpdateTermDto,
    @Res() res: Response,
  ) {
    try {
      const updatedTerm = await this.termService.updateTerm(id, updateTermDto);
      if (!updatedTerm) {
        return res
          .status(404)
          .json(
            format_json(404, false, 'Not Found', updatedTerm.data, updatedTerm.message, null),
          );
      }
      return res
        .status(200)
        .json(
          format_json(
            200,
            true,
            null,
            null,
            'Term updated successfully',
            updatedTerm,
          ),
        );
    } catch (error: any) {
      return res
        .status(400)
        .json(
          format_json(
            500,
            false,
            null,
            error || error,
            'Server Error',
            error.message,
          ),
        );
    }
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'manager', 'operator')
  @ApiOperation({ summary: 'Get term' })
  @ApiResponse({
    status: 200,
    description: 'Term retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        title: { type: 'string' },
        content: { type: 'string' },
        term_category: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
          },
        },
      },
    },
  })
  async findAll(@Res() res: Response) {
    try {
      const terms = await this.termService.findAll();
      return res
        .status(200)
        .json(
          format_json(
            200,
            true,
            null,
            null,
            'Terms retrieved successfully',
            terms,
          ),
        );
    } catch (error: any) {
      return res
        .status(400)
        .json(
          format_json(
            500,
            false,
            null,
            error || error,
            'Server Error',
            error.message,
          ),
        );
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'manager', 'operator')
  @ApiOperation({ summary: 'Details term' })
  @ApiResponse({
    status: 200,
    description: 'Term retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        title: { type: 'string' },
        content: { type: 'string' },
        term_category: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
          },
        },
      },
    },
  })
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const term = await this.termService.findOne(id);
      if (!term) {
        return res
          .status(404)
          .json(
            format_json(404, false, 'Not Found', null, 'Term not found', null),
          );
      }
      return res
        .status(200)
        .json(
          format_json(
            200,
            true,
            null,
            null,
            'Term retrieved successfully',
            term,
          ),
        );
    } catch (error: any) {
      return res
        .status(400)
        .json(
          format_json(
            500,
            false,
            null,
            error || error,
            'Server Error',
            error.message,
          ),
        );
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'manager', 'operator')
  @ApiOperation({ summary: 'Delete term' })
  @ApiResponse({
    status: 200,
    description: 'Term deleted successfully',
    schema: {
      type: 'object',
      properties: {
        data: { type: 'null' },
      },
    },
  })
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const term = await this.termService.findOne(id);
      if (!term) {
        return res
          .status(404)
          .json(
            format_json(404, false, 'Not Found', null, 'Term not found', null),
          );
      }
      await this.termService.removeTerm(id);
      return res
        .status(200)
        .json(
          format_json(200, true, null, null, 'Term deleted successfully', null),
        );
    } catch (error: any) {
      return res
        .status(400)
        .json(
          format_json(
            500,
            false,
            null,
            error || error,
            'Server Error',
            error.message,
          ),
        );
    }
  }

  @Post('send-a-ticket')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UsePipes(CustomValidationPipe)
  @Roles('admin')
  @ApiOperation({ summary: 'Create ticket' })
  @ApiResponse({ status: 200, description: 'Success' })
  async sendTicket(
    @Body() ticketDto: TicketDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const authorizationHeader = req.headers['authorization'];

      if (!authorizationHeader) {
        return res
          .status(400)
          .json(
            format_json(
              400,
              false,
              null,
              null,
              'Authorization header is missing',
              null,
            ),
          );
      }

      const token = authorizationHeader.split(' ')[1];

      if (!token) {
        return res
          .status(400)
          .json(
            format_json(
              400,
              false,
              null,
              null,
              'Bearer token is missing',
              null,
            ),
          );
      }

      const ticket = await this.termService.sendTicket(ticketDto, token);
      if (ticket.status) {
        return res.status(200).json(
          format_json(200, true, null, null, ticket.message, ticket.data)
        );
      } else {
        return res.status(400).json(
          format_json(400, false, null, ticket.data, 'Error Server', null)
        );
      }
    } catch (error: any) {
      return res
        .status(400)
        .json(
          format_json(
            500,
            false,
            null,
            error || error,
            'Server Error',
            error.message,
          ),
        );
    }
  }
}
