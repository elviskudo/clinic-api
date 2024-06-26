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
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { format_json } from 'src/env';
import { TermCategoryDto } from 'src/dto/term/term.category.dto';
import { UpdateTermCategoryDto } from 'src/dto/term/update.term.category.dto';
import { TermCategoryService } from 'src/service/term/term.category.service';

@Controller('api/term-categories')
export class TermCategoryController {
  constructor(private readonly termCategoryService: TermCategoryService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() termCategoryDto: TermCategoryDto) {
    try {
      const createdTermCategory =
        await this.termCategoryService.createTermCategory(termCategoryDto);
      return format_json(
        201,
        true,
        null,
        null,
        'Term category created successfully',
        createdTermCategory,
      );
    } catch (error) {
      throw new HttpException(
        format_json(
          400,
          false,
          'Bad Request',
          null,
          'Failed to create term category',
          null,
        ),
        400,
      );
    }
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id') id: string,
    @Body() updateTermCategoryDto: UpdateTermCategoryDto,
  ) {
    try {
      const updatedTermCategory =
        await this.termCategoryService.updateTermCategory(
          +id,
          updateTermCategoryDto,
        );
      return format_json(
        200,
        true,
        null,
        null,
        'Term category updated successfully',
        updatedTermCategory,
      );
    } catch (error) {
      throw new HttpException(
        format_json(
          400,
          false,
          'Bad Request',
          null,
          'Failed to update term category',
          null,
        ),
        400,
      );
    }
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll() {
    try {
      const termCategories = await this.termCategoryService.findAll();
      return format_json(
        200,
        true,
        null,
        null,
        'Term categories retrieved successfully',
        termCategories,
      );
    } catch (error) {
      throw new HttpException(
        format_json(
          500,
          false,
          'Internal Server Error',
          null,
          'Failed to retrieve term categories',
          null,
        ),
        500,
      );
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id') id: string) {
    try {
      const termCategory = await this.termCategoryService.findOne(+id);
      return format_json(
        200,
        true,
        null,
        null,
        'Term category retrieved successfully',
        termCategory,
      );
    } catch (error) {
      throw new HttpException(
        format_json(
          500,
          false,
          'Internal Server Error',
          null,
          'Failed to retrieve term category',
          null,
        ),
        500,
      );
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: string) {
    try {
      await this.termCategoryService.removeTermCategory(+id);
      return format_json(
        200,
        true,
        null,
        null,
        'Term category deleted successfully',
        null,
      );
    } catch (error) {
      throw new HttpException(
        format_json(
          500,
          false,
          'Internal Server Error',
          null,
          'Failed to delete term category',
          null,
        ),
        500,
      );
    }
  }
}
