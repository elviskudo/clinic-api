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

@Controller('api/drug-categories')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UsePipes(CustomValidationPipe)
  @Roles('admin', 'manager', 'operator')
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
    } catch (error) {
      return res
      .status(400)
      .json(
        format_json(
          400,
          false,
          'Bad Request',
          null,
           error,
          null,
        ),
      );
    }
  }

  @Put(':id')
  @UsePipes(CustomValidationPipe)
  @Roles('admin', 'manager', 'operator')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Res() res: Response,
  ) {
    try {
      const updatedCategory = await this.categoryService.updateCategory(
        +id,
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
    } catch (error) {
      return res
      .status(400)
      .json(
        format_json(
          400,
          false,
          'Bad Request',
          null,
           error,
          null,
        ),
      );
    }
  }

  @Get()
  @Roles('admin', 'manager', 'operator')
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
    } catch (error) {
      return res
        .status(500)
        .json(
          format_json(
            500,
            false,
            'Internal Server Error',
            null,
            'Failed to retrieve categories',
            error || error,
          ),
        );
    }
  }

  @Get(':id')
  @Roles('admin', 'manager', 'operator')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const category = await this.categoryService.findOne(+id);
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
    } catch (error) {
      return res
        .status(500)
        .json(
          format_json(
            500,
            false,
            'Internal Server Error',
            null,
            'Failed to retrieve category',
            error || error,
          ),
        );
    }
  }

  @Delete(':id')
  @Roles('admin', 'manager', 'operator')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.categoryService.removeCategory(+id);
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
    } catch (error) {
      return res
        .status(500)
        .json(
          format_json(
            500,
            false,
            'Internal Server Error',
            null,
            'Failed to delete category',
            error || error,
          ),
        );
    }
  }
}
