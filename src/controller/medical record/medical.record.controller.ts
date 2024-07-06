import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { format_json } from 'src/env';
import { RolesGuard } from 'src/middleware/role.guard';
import { MedicalRecordService } from 'src/service/medical record/medical.record.service';
import { MedicalRecordDto } from 'src/dto/medical record/medical.record.dto';
import { UpdateMedicalRecordDto } from 'src/dto/medical record/update.medical.record.dto';
import { RecordResponseDto } from 'src/dto/medical record/medical.record.response.dto';

@Controller('api/medicalrecords')
export class MedicalRecordController {
  constructor(private readonly medicalRecordService: MedicalRecordService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async create(
    @Body() medicalRecordDto: MedicalRecordDto,
    @Res() res: Response,
  ) {
    try {
      const createdRecord =
        await this.medicalRecordService.createRecord(medicalRecordDto);
      return res
        .status(201)
        .json(
          format_json(
            201,
            true,
            null,
            null,
            'Medical record created successfully',
            createdRecord,
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
            'Failed to create medical record',
            error.message || error,
          ),
        );
    }
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async update(
    @Param('id') id: string,
    @Body() updateMedicalRecordDto: UpdateMedicalRecordDto,
    @Res() res: Response,
  ) {
    try {
      const updatedRecord = await this.medicalRecordService.updateRecord(
        +id,
        updateMedicalRecordDto,
      );
      if (!updatedRecord) {
        return res
          .status(404)
          .json(
            format_json(
              404,
              false,
              'Not Found',
              null,
              'Medical record not found',
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
            'Medical record updated successfully',
            updatedRecord,
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
            'Failed to update medical record',
            error.message || error,
          ),
        );
    }
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async findAll(@Res() res: Response) {
    try {
      const records = await this.medicalRecordService.findAll();
      return res
        .status(200)
        .json(
          format_json(
            200,
            true,
            null,
            null,
            'Medical records retrieved successfully',
            records,
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
            'Failed to retrieve medical records',
            error.message || error,
          ),
        );
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const record = await this.medicalRecordService.findOne(+id);
      if (!record) {
        return res
          .status(404)
          .json(
            format_json(
              404,
              false,
              'Not Found',
              null,
              'Medical record not found',
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
            'Medical record retrieved successfully',
            record,
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
            'Failed to retrieve medical record',
            error.message || error,
          ),
        );
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const record = await this.medicalRecordService.findOne(+id);
      if (!record) {
        return res
          .status(404)
          .json(
            format_json(
              404,
              false,
              'Not Found',
              null,
              'Medical record not found',
              null,
            ),
          );
      }
      await this.medicalRecordService.removeRecord(+id);
      return res
        .status(200)
        .json(
          format_json(
            200,
            true,
            null,
            null,
            'Medical record deleted successfully',
            null,
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
            'Failed to delete medical record',
            error.message || error,
          ),
        );
    }
  }
}
