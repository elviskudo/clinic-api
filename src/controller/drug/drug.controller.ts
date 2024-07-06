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
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { format_json } from 'src/env';
import { RolesGuard } from 'src/middleware/role.guard';
import { Roles } from 'src/middleware/role.decorator';
import { DrugDto } from 'src/dto/drug/drug.dto';
import { UpdateDrugDto } from 'src/dto/drug/update.drug.dto';
import { DrugService } from 'src/service/drug/drug.service';

@Controller('api/drugs')
export class DrugController {
  constructor(private readonly drugService: DrugService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'manager', 'operator')
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
        .status(error.getStatus ? error.getStatus() : 400)
        .json(
          format_json(
            error.getStatus ? error.getStatus() : 400,
            false,
            error.getResponse ? error.getResponse()['errors'] : 'Bad Request',
            null,
            error.getResponse ? error.getResponse()['message'] : error.message,
            null,
          ),
        );
    }
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'manager', 'operator')
  async update(
    @Param('id') id: string,
    @Body() updateDrugDto: UpdateDrugDto,
    @Res() res: Response,
  ) {
    try {
      const updatedDrug = await this.drugService.updateDrug(+id, updateDrugDto);
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
        .status(error.getStatus ? error.getStatus() : 400)
        .json(
          format_json(
            error.getStatus ? error.getStatus() : 400,
            false,
            error.getResponse ? error.getResponse()['errors'] : 'Bad Request',
            null,
            error.getResponse
              ? error.getResponse()['message']
              : 'Failed to update drug',
            null,
          ),
        );
    }
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'manager', 'operator')
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
            error.message || error,
          ),
        );
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'manager', 'operator')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const drug = await this.drugService.findOne(+id);
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
            error.message || error,
          ),
        );
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'manager', 'operator')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.drugService.removeDrug(+id);
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
            error.message || error,
          ),
        );
    }
  }
}
