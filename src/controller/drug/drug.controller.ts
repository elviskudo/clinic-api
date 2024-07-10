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
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { format_json } from 'src/env';
import { RolesGuard } from 'src/middleware/role.guard';
import { Roles } from 'src/middleware/role.decorator';
import { DrugDto } from 'src/dto/drug/drug.dto';
import { UpdateDrugDto } from 'src/dto/drug/update.drug.dto';
import { DrugService } from 'src/service/drug/drug.service';
import { CustomValidationPipe } from 'src/custom-validation.pipe';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Drug')
@Controller('api/drugs')
export class DrugController {
  constructor(private readonly drugService: DrugService) {}

  @Post()
  @UsePipes(CustomValidationPipe)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'manager', 'operator')
  @ApiOperation({ summary: 'Create' })
  @ApiResponse({ status: 200, description: 'Success' })
  async create(@Body() drugDto: DrugDto, @Res() res: Response) {
    try {
      const createdDrug = await this.drugService.createDrug(drugDto);
      return res
        .status(201)
        .json(
          format_json(
            201,
            true,
            null,
            null,
            'Drug created successfully',
            createdDrug,
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
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'manager', 'operator')
  @ApiOperation({ summary: 'Update' })
  @ApiResponse({ status: 200, description: 'Success' })
  async update(
    @Param('id') id: string,
    @Body() updateDrugDto: UpdateDrugDto,
    @Res() res: Response,
  ) {
    try {
      const updatedDrug = await this.drugService.updateDrug(id, updateDrugDto);
      return res
        .status(200)
        .json(
          format_json(
            200,
            true,
            null,
            null,
            'Drug updated successfully',
            updatedDrug,
          ),
        );
    } catch (error) {
      return res
        .status(400)
        .json(
          format_json(
            400,
            false,
            error,
            null,
            error,
            null,
          ),
        );
    }
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'manager', 'operator')
  @ApiOperation({ summary: 'Get' })
  @ApiResponse({ status: 200, description: 'Success' })
  async findAll(@Res() res: Response) {
    try {
      const drugs = await this.drugService.findAll();
      return res
        .status(200)
        .json(
          format_json(
            200,
            true,
            null,
            null,
            'Drugs retrieved successfully',
            drugs,
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
            'Failed to retrieve drugs',
            error || error,
          ),
        );
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'manager', 'operator')
  @ApiOperation({ summary: 'Details' })
  @ApiResponse({ status: 200, description: 'Success' })
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const drug = await this.drugService.findOne(id);
      if (!drug) {
        return res
          .status(404)
          .json(
            format_json(404, false, 'Not Found', null, 'Drug not found', null),
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
            'Drug retrieved successfully',
            drug,
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
            'Failed to retrieve drug',
            error || error,
          ),
        );
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'manager', 'operator')
  @ApiOperation({ summary: 'Delete' })
  @ApiResponse({ status: 200, description: 'Success' })
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.drugService.removeDrug(id);
      return res
        .status(200)
        .json(
          format_json(200, true, null, null, 'Drug deleted successfully', null),
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
            'Failed to delete drug',
            error || error,
          ),
        );
    }
  }
}
