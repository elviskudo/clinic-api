import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CategoryDto } from 'src/dto/category/category.dto';
import { UpdateCategoryDto } from 'src/dto/category/update.category.dto';
import { ZodError, z } from 'zod';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async createCategory(categoryDto: CategoryDto) {
    const schema = z.object({
      category_name: z.string().min(1),
      description: z.string().min(1),
    });

    try {
      const validatedData = schema.parse(categoryDto);
      const create = await this.prisma.drugCategory.create({
        data: {
          category_name: validatedData.category_name,
          description: validatedData.description,
        },
      });

      return {
        status: true,
        message: 'Success',
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

  async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto) {
    const schema = z.object({
      category_name: z.string().min(1),
      description: z.string().min(1),
    });

    try {
      const validatedData = schema.parse(updateCategoryDto);
      const update = await this.prisma.drugCategory.update({
        where: { id: id },
        data: {
          category_name: validatedData.category_name,
          description: validatedData.description,
        },
      });

      return {
        status: true,
        message: 'Success',
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
    const categories = await this.prisma.drugCategory.findMany();
    return {
      status: true,
      message: 'Categories successfully retrieved',
      data: categories,
    };
  }

  async findOne(id: string) {
    const category = await this.prisma.drugCategory.findUnique({
      where: { id: id },
    });

    if (category) {
      return {
        status: true,
        message: 'Success',
        data: category,
      };
    } else {
      return {
        status: false,
        message: 'Category not found',
        data: null,
      };
    }
  }

  async removeCategory(id: string) {
    const deleteCategory = await this.prisma.drugCategory.delete({
      where: {
        id: id,
      },
    });

    if (deleteCategory) {
      return {
        status: true,
        message: 'Category successfully deleted',
        data: deleteCategory,
      };
    } else {
      return {
        status: false,
        message: 'Failed to delete category',
        data: null,
      };
    }
  }
}

/*
{
    "status": 201,
    "success": true,
    "errors": null,
    "meta": null,
    "message": "Category created successfully",
    "data": {
        "id": "02546d8a-6d3a-4119-9767-20df7f20334a",
        "category_name": "Antibiotic",
        "description": "Description for Antibiotic drugs"
    }
}
*/
