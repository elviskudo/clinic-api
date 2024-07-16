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
  Res,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { format_json } from 'src/env';
import { BankCategoryDto } from 'src/dto/bank/bank.category.dto';
import { UpdateBankCategoryDto } from 'src/dto/bank/update.bank.category.dto';
import { BankCategoryService } from 'src/service/bank/bank.category.service';
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
import { Response } from 'express';

@ApiTags('Bank Categories')
@ApiSecurity('bearer')
@ApiBearerAuth()
@Controller('api/bank-categories')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class BankCategoryController {
  constructor(private readonly bankCategoryService: BankCategoryService) {}

  @Post()
  @Roles('admin', 'manager', 'operator')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UsePipes(CustomValidationPipe)
  @ApiOperation({ summary: 'Create' })
  @ApiResponse({
    status: 201,
    description: 'Bank category created successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        category_name: { type: 'string' },
        description: { type: 'string' },
      },
    },
  })
  async create(@Res() res: Response, @Body() bankCategoryDto: BankCategoryDto) {
    try {
      const createdBankCategory =
        await this.bankCategoryService.createBankCategory(bankCategoryDto);

      if (createdBankCategory.status === true) {
        return res
          .status(201)
          .json(
            format_json(
              200,
              true,
              null,
              null,
              'Bank category Created Success',
              createdBankCategory.data,
            ),
          );
      } else {
        return res
          .status(400)
          .json(
            format_json(
              400,
              false,
              createdBankCategory.errors,
              null,
              createdBankCategory.message,
              null,
            ),
          );
      }
    } catch (error: any) {
      throw new HttpException(
        format_json(
          400,
          false,
          'Bad Request',
          null,
          'Failed to create bank category',
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
    description: 'Bank category updated successfully',
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
    @Res() res: Response,
    @Body() updateBankCategoryDto: UpdateBankCategoryDto,
  ) {
    try {
      const updatedBankCategory =
        await this.bankCategoryService.updateBankCategory(
          id,
          updateBankCategoryDto,
        );

      if (updatedBankCategory.status === true) {
        return res
          .status(201)
          .json(
            format_json(
              200,
              false,
              null,
              null,
              'Bank category update Success',
              updatedBankCategory.data,
            ),
          );
      } else {
        return res
          .status(400)
          .json(
            format_json(
              400,
              false,
              updatedBankCategory.errors,
              null,
              updatedBankCategory.message,
              null,
            ),
          );
      }
    } catch (error: any) {
      throw new HttpException(
        format_json(
          400,
          false,
          'Bad Request',
          null,
          'Failed to update bank category',
          error.message,
        ),
        400,
      );
    }
  }

  @Get()
  @Roles('admin', 'manager', 'operator')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOperation({ summary: 'Get all' })
  @ApiResponse({
    status: 200,
    description: 'Bank categories retrieved successfully',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          category_name: { type: 'string' },
          description: { type: 'string' },
        },
      },
    },
  })
  async findAll() {
    try {
      const bankCategories = await this.bankCategoryService.findAll();
      return format_json(
        200,
        true,
        null,
        null,
        'Bank categories retrieved successfully',
        bankCategories,
      );
    } catch (error: any) {
      throw new HttpException(
        format_json(
          400,
          false,
          'Bad Request',
          null,
          'Failed to retrieve bank categories',
          error.message,
        ),
        400,
      );
    }
  }

  @Get(':id')
  @Roles('admin', 'manager', 'operator')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOperation({ summary: 'Get by ID' })
  @ApiResponse({
    status: 200,
    description: 'Bank category retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        category_name: { type: 'string' },
        description: { type: 'string' },
      },
    },
  })
  async findOne(@Param('id') id: string) {
    try {
      const bankCategory = await this.bankCategoryService.findOne(id);
      if (!bankCategory) {
        throw new HttpException(
          format_json(
            404,
            false,
            'Not Found',
            null,
            'Bank category not found',
            null,
          ),
          404,
        );
      }
      return format_json(
        200,
        true,
        null,
        null,
        'Bank category retrieved successfully',
        bankCategory,
      );
    } catch (error: any) {
      throw new HttpException(
        format_json(
          400,
          false,
          'Bad Request',
          null,
          'Failed to retrieve bank category',
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
    description: 'Bank category deleted successfully',
    schema: {
      type: 'object',
      properties: {
        data: { type: 'null' },
      },
    },
  })
  async remove(@Param('id') id: string) {
    try {
      await this.bankCategoryService.removeBankCategory(id);
      return format_json(
        200,
        true,
        null,
        null,
        'Bank category deleted successfully',
        null,
      );
    } catch (error: any) {
      throw new HttpException(
        format_json(
          400,
          false,
          'Bad Request',
          null,
          'Failed to delete bank category',
          error.message,
        ),
        400,
      );
    }
  }
}
