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
  UsePipes,
  Logger,
  Req,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { format_json } from 'src/env';
import { RolesGuard } from 'src/middleware/role.guard';
import { MedicalRecordService } from 'src/service/medical record/medical.record.service';
import { MedicalRecordDto } from 'src/dto/medical record/medical.record.dto';
import { UpdateMedicalRecordDto } from 'src/dto/medical record/update.medical.record.dto';
import { RecordResponseDto } from 'src/dto/medical record/medical.record.response.dto';
import { CustomValidationPipe } from 'src/custom-validation.pipe';
import { Roles } from 'src/middleware/role.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Medical Records')
@Controller('api/medicalrecords')
export class MedicalRecordController {
  private readonly logger = new Logger(MedicalRecordController.name);

  constructor(private readonly medicalRecordService: MedicalRecordService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @UsePipes(CustomValidationPipe)
  @ApiOperation({ summary: 'Create' })
  @ApiResponse({ status: 200, description: 'Success' })
  async create(
    @Body() medicalRecordDto: MedicalRecordDto,
    @Res() res: Response,
    @Req() req: Request
  ) {
    try {
      const authorizationHeader = req.headers['authorization'];

      if (!authorizationHeader) {
        console.log('Authorization header is missing');
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json(
            format_json(
              400,
              false,
              null,
              null,
              'Authorization header is missing',
              null,
            ),
          );
      }

      const token = authorizationHeader.split(' ')[1];
      if (!token) {
        console.log('Bearer token is missing');
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json(
            format_json(
              400,
              false,
              null,
              null,
              'Bearer token is missing',
              null,
            ),
          );
      }


      const createdRecord =
      await this.medicalRecordService.createRecord(medicalRecordDto,token);

      if (createdRecord.status) {
        return res
          .status(HttpStatus.OK)
          .json(
            format_json(200, true, null, null, createdRecord.message, createdRecord.data),
          );
      } else {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json(format_json(400, false, null, createdRecord.data, createdRecord.message, null));
      }
    } catch (error:any) {
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
  @Roles('admin')
  @UsePipes(CustomValidationPipe)
  @ApiOperation({ summary: 'Update' })
  @ApiResponse({ status: 200, description: 'Success' })
  async update(
    @Param('id') id: string,
    @Body() updateMedicalRecordDto: MedicalRecordDto,
    @Res() res: Response,
  ) {
    try {
      const updatedRecord = await this.medicalRecordService.updateRecord(
        id,
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
      this.logger.error('Error updating medical record', error);
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      return res
        .status(400)
        .json(
          format_json(
            400,
            false,
            'Bad Request',
            null,
            'Failed to update medical record',
            errorMessage,
          ),
        );
    }
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOperation({ summary: 'Get' })
  @ApiResponse({ status: 200, description: 'Success' })
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
      this.logger.error('Error retrieving medical records', error);
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      return res
        .status(400)
        .json(
          format_json(
            400,
            false,
            'Bad Request',
            null,
            'Failed to retrieve medical records',
            errorMessage,
          ),
        );
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOperation({ summary: 'Details' })
  @ApiResponse({ status: 200, description: 'Success' })
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const record = await this.medicalRecordService.findOne(id);
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
      this.logger.error('Error retrieving medical record', error);
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      return res
        .status(400)
        .json(
          format_json(
            400,
            false,
            'Bad Request',
            null,
            'Failed to retrieve medical record',
            errorMessage,
          ),
        );
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOperation({ summary: 'Delete' })
  @ApiResponse({ status: 200, description: 'Success' })
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const record = await this.medicalRecordService.findOne(id);
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
      await this.medicalRecordService.removeRecord(id);
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
      this.logger.error('Error deleting medical record', error);
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      return res
        .status(400)
        .json(
          format_json(
            400,
            false,
            'Bad Request',
            null,
            'Failed to delete medical record',
            errorMessage,
          ),
        );
    }
  }
}
