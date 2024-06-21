import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
  Res,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/middleware/role.guard';
import { Roles } from 'src/middleware/role.decorator';
import { format_json } from 'src/env';
import { CategoryService } from 'src/service/category.service';
import { CategoryDto } from 'src/dto/category/category.dto';
import { UpdateCategoryDto } from 'src/dto/category/update.category.dto';
import { Request, Response } from 'express';

@Controller('api/drug_categories')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @Roles('admin')
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
            'Failed to create category',
            error.message,
          ),
        );
    }
  }

  @Put(':id')
  @Roles('admin')
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
            'Failed to update category',
            error.message,
          ),
        );
    }
  }

  @Get()
  @Roles('admin', 'user', 'doctor')
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
            error.message,
          ),
        );
    }
  }

  @Get(':id')
  @Roles('admin', 'user', 'doctor')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const category = await this.categoryService.findOne(+id);
      if (!category) {
        return res
          .status(404)
          .json(
            format_json(404, false, null, null, 'Category not found', null),
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
            error.message,
          ),
        );
    }
  }

  @Delete(':id')
  @Roles('admin')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const category = await this.categoryService.findOne(+id);
      if (!category) {
        return res
          .status(404)
          .json(
            format_json(404, false, null, null, 'Category not found', null),
          );
      }

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
            error.message,
          ),
        );
    }
  }
}
