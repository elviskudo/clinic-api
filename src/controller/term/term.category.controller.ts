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
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { format_json } from 'src/env';
import { TermCategoryDto } from 'src/dto/term/term.category.dto';
import { UpdateTermCategoryDto } from 'src/dto/term/update.term.category.dto';
import { TermCategoryService } from 'src/service/term/term.category.service';
import { CustomValidationPipe } from 'src/custom-validation.pipe';
import { Roles } from 'src/middleware/role.decorator';
import { RolesGuard } from 'src/middleware/role.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Term Category')
@ApiSecurity('bearer')
@ApiBearerAuth()
@Controller('api/term-categories')
@UseGuards(RolesGuard)
export class TermCategoryController {
  constructor(private readonly termCategoryService: TermCategoryService) {}

  @Post()
  @Roles('admin', 'manager', 'operator')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UsePipes(CustomValidationPipe)
  @ApiOperation({ summary: 'Create' })
  @ApiResponse({
    status: 201,
    description: 'Term category created successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        name: { type: 'string' },
      },
    },
  })
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
    } catch (error: any) {
      throw new HttpException(
        format_json(
          400,
          false,
          'Bad Request',
          null,
          'Failed to create term category',
          error.message,
        ),
        400,
      );
    }
  }

  @Put(':id')
  @Roles('admin', 'manager', 'operator')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UsePipes(CustomValidationPipe)
  @ApiOperation({ summary: 'Update' })
  @ApiResponse({
    status: 200,
    description: 'Term category updated successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        name: { type: 'string' },
      },
    },
  })
  async update(
    @Param('id') id: string,
    @Body() updateTermCategoryDto: UpdateTermCategoryDto,
  ) {
    try {
      const updatedTermCategory =
        await this.termCategoryService.updateTermCategory(
          id,
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
    } catch (error: any) {
      throw new HttpException(
        format_json(
          400,
          false,
          'Bad Request',
          null,
          'Failed to update term category',
          error.message,
        ),
        400,
      );
    }
  }

  @Get()
  @Roles('admin', 'manager', 'operator')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOperation({ summary: 'Get' })
  @ApiResponse({
    status: 200,
    description: 'Term category retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        name: { type: 'string' },
      },
    },
  })
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
    } catch (error: any) {
      throw new HttpException(
        format_json(
          400,
          false,
          'Bad Request',
          null,
          'Failed to get term category',
          error.message,
        ),
        400,
      );
    }
  }

  @Get(':id')
  @Roles('admin', 'manager', 'operator')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOperation({ summary: 'Details' })
  @ApiResponse({
    status: 200,
    description: 'Term category retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        name: { type: 'string' },
      },
    },
  })
  async findOne(@Param('id') id: string) {
    try {
      const termCategory = await this.termCategoryService.findOne(id);
      return format_json(
        200,
        true,
        null,
        null,
        'Term category retrieved successfully',
        termCategory,
      );
    } catch (error: any) {
      throw new HttpException(
        format_json(
          400,
          false,
          'Bad Request',
          null,
          'Failed to get term category',
          error.message,
        ),
        400,
      );
    }
  }

  @Delete(':id')
  @Roles('admin', 'manager', 'operator')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOperation({ summary: 'Delete' })
  @ApiResponse({
    status: 200,
    description: 'Term Category deleted successfully',
    schema: {
      type: 'object',
      properties: {
        data: { type: 'null' },
      },
    },
  })
  async remove(@Param('id') id: string) {
    try {
      await this.termCategoryService.removeTermCategory(id);
      return format_json(
        200,
        true,
        null,
        null,
        'Term category deleted successfully',
        null,
      );
    } catch (error: any) {
      throw new HttpException(
        format_json(
          400,
          false,
          'Bad Request',
          null,
          'Failed to delete term category',
          error.message,
        ),
        400,
      );
    }
  }
}
