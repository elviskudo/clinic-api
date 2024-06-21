import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  HttpException,
  Res,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { format_json } from 'src/env';
import { UpdateTermDto } from 'src/dto/term/update.term.dto';
import { TermDto } from 'src/dto/term/term.dto';
import { TermService } from 'src/service/term/term.service';

@Controller('api/terms')
export class TermController {
  constructor(private readonly termService: TermService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() termDto: TermDto, @Res() res: Response) {
    try {
      const createdTerm = await this.termService.createTerm(termDto);
      return res
        .status(201)
        .json(
          format_json(
            201,
            true,
            null,
            null,
            'Term created successfully',
            createdTerm,
          ),
        );
    } catch (error) {
      return res
        .status(400)
        .json(
          format_json(
            400,
            false,
            'Bad Request',
            null,
            'Failed to create term',
            error.message || error,
          ),
        );
    }
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id') id: string,
    @Body() updateTermDto: UpdateTermDto,
    @Res() res: Response,
  ) {
    try {
      const updatedTerm = await this.termService.updateTerm(+id, updateTermDto);
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
    } catch (error) {
      return res
        .status(400)
        .json(
          format_json(
            400,
            false,
            'Bad Request',
            null,
            'Failed to update term',
            error.message || error,
          ),
        );
    }
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
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
    } catch (error) {
      return res
        .status(500)
        .json(
          format_json(
            500,
            false,
            'Internal Server Error',
            null,
            'Failed to retrieve terms',
            error.message || error,
          ),
        );
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const term = await this.termService.findOne(+id);
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
    } catch (error) {
      return res
        .status(500)
        .json(
          format_json(
            500,
            false,
            'Internal Server Error',
            null,
            'Failed to retrieve term',
            error.message || error,
          ),
        );
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.termService.removeTerm(+id);
      return res
        .status(200)
        .json(
          format_json(200, true, null, null, 'Term deleted successfully', null),
        );
    } catch (error) {
      return res
        .status(500)
        .json(
          format_json(
            500,
            false,
            'Internal Server Error',
            null,
            'Failed to delete term',
            error.message || error,
          ),
        );
    }
  }
}
