import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Res,
  HttpException,
  HttpStatus,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { format_json } from 'src/env';
import { RolesGuard } from 'src/middleware/role.guard';
import { Roles } from 'src/middleware/role.decorator';
import { CategoryDto } from 'src/dto/category/category.dto';
import { UpdateCategoryDto } from 'src/dto/category/update.category.dto';
import { CategoryService } from 'src/service/category.service';
import { CustomValidationPipe } from 'src/custom-validation.pipe';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Drug Category')
@ApiSecurity('bearer')
@ApiBearerAuth()
@Controller('api/drug-categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UsePipes(CustomValidationPipe)
  @Roles('admin', 'manager', 'operator')
  @ApiOperation({ summary: 'Create' })
  @ApiResponse({
    status: 201,
    description: 'Category created successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        category_name: { type: 'string' },
        description: { type: 'string' },
      },
    },
  })
  async create(@Body() categoryDto: CategoryDto, @Res() res: Response) {
    try {
      const createdCategory =
        await this.categoryService.createCategory(categoryDto);
      return res
        .status(201)
        .json(
          format_json(
            201,
            true,
            null,
            null,
            'Category created successfully',
            createdCategory,
          ),
        );
    } catch (error: any) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(
          format_json(
            500,
            false,
            true,
            null,
            'Server Error ' + error,
            error.message,
          ),
        );
    }
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UsePipes(CustomValidationPipe)
  @Roles('admin', 'manager', 'operator')
  @ApiOperation({ summary: 'Update' })
  @ApiResponse({
    status: 200,
    description: 'Category updated successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        category_name: { type: 'string' },
        description: { type: 'string' },
      },
    },
  })
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Res() res: Response,
  ) {
    try {
      const updatedCategory = await this.categoryService.updateCategory(
        id,
        updateCategoryDto,
      );
      return res
        .status(200)
        .json(
          format_json(
            200,
            true,
            null,
            null,
            'Category updated successfully',
            updatedCategory,
          ),
        );
    } catch (error: any) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(
          format_json(
            500,
            false,
            true,
            null,
            'Server Error ' + error,
            error.message,
          ),
        );
    }
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'manager', 'operator')
  @ApiOperation({ summary: 'Get' })
  @ApiResponse({
    status: 200,
    description: 'Category retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        category_name: { type: 'string' },
        description: { type: 'string' },
      },
    },
  })
  async findAll(@Res() res: Response) {
    try {
      const categories = await this.categoryService.findAll();
      return res
        .status(200)
        .json(
          format_json(
            200,
            true,
            null,
            null,
            'Categories retrieved successfully',
            categories,
          ),
        );
    } catch (error: any) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(
          format_json(
            500,
            false,
            true,
            null,
            'Server Error ' + error,
            error.message,
          ),
        );
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'manager', 'operator')
  @ApiOperation({ summary: 'Details' })
  @ApiResponse({
    status: 200,
    description: 'Category retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        category_name: { type: 'string' },
        description: { type: 'string' },
      },
    },
  })
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const category = await this.categoryService.findOne(id);
      if (!category) {
        return res
          .status(404)
          .json(
            format_json(
              404,
              false,
              'Not Found',
              null,
              'Category not found',
              null,
            ),
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
            'Category retrieved successfully',
            category,
          ),
        );
    } catch (error: any) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(
          format_json(
            500,
            false,
            true,
            null,
            'Server Error ' + error,
            error.message,
          ),
        );
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'manager', 'operator')
  @ApiOperation({ summary: 'Delete' })
  @ApiResponse({
    status: 200,
    description: 'Category deleted successfully',
    schema: {
      type: 'object',
      properties: {
        data: { type: 'null' },
      },
    },
  })
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.categoryService.removeCategory(id);
      return res
        .status(200)
        .json(
          format_json(
            200,
            true,
            null,
            null,
            'Category deleted successfully',
            null,
          ),
        );
    } catch (error: any) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(
          format_json(
            500,
            false,
            true,
            null,
            'Server Error ' + error,
            error.message,
          ),
        );
    }
  }
}
