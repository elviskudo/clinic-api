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
  UsePipes,
  HttpStatus,
} from '@nestjs/common';

import { ClinicService } from 'src/service/clinic/clinic.service';
import { UpdateClinicDto } from 'src/dto/clinic/update.clinic.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/middleware/role.guard';
import { Roles } from 'src/middleware/role.decorator';
import { format_json } from 'src/env';
import { ClinicDto } from 'src/dto/clinic/clinic.dto';
import { Request, Response } from 'express';
import { CustomValidationPipe } from 'src/custom-validation.pipe';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Clinic')
@Controller('api/clinics')
export class ClinicController {
  constructor(private readonly clinicService: ClinicService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UsePipes(CustomValidationPipe)
  @Roles('admin', 'manager', 'operator')
  @ApiOperation({ summary: 'Create' })
  @ApiResponse({ status: 200, description: 'Success' })
  async create(
    @Body() clinicDto: ClinicDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const createdClinic = await this.clinicService.createClinic(clinicDto);
      return res
        .status(201)
        .json(
          format_json(
            201,
            true,
            null,
            null,
            'Clinic created successfully',
            createdClinic,
          ),
        );
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
  @UsePipes(CustomValidationPipe)
  @Roles('admin', 'manager', 'operator')
  @ApiOperation({ summary: 'Update' })
  @ApiResponse({ status: 200, description: 'Success' })
  async update(
    @Param('id') id: string,
    @Body() updateClinicDto: UpdateClinicDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const clinic = await this.clinicService.findOne(id);
      if (!clinic) {
        return res
          .status(404)
          .json(format_json(404, false, null, null, 'Clinic not found', null));
      }

      const updatedClinic = await this.clinicService.updateClinic(id,updateClinicDto,
      );
      return res
        .status(200)
        .json(
          format_json(
            200,
            true,
            null,
            null,
            'Clinic updated successfully',
            updatedClinic,
          ),
        );
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

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'manager', 'operator', 'patient', 'doctor', 'guest')
  @ApiOperation({ summary: 'Get' })
  @ApiResponse({ status: 200, description: 'Success' })
  async findAll(@Req() req: Request, @Res() res: Response) {
    try {
      const clinics = await this.clinicService.findAll();
      return res
        .status(200)
        .json(
          format_json(
            200,
            true,
            null,
            null,
            'Clinics retrieved successfully',
            clinics,
          ),
        );
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

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'manager', 'operator', 'patient', 'doctor', 'guest')
  @ApiOperation({ summary: 'Detail' })
  @ApiResponse({ status: 200, description: 'Success' })
  async findOne(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const clinic = await this.clinicService.findOne(id);
      if (!clinic) {
        return res
          .status(404)
          .json(format_json(404, false, null, null, 'Clinic not found', null));
      }
      return res
        .status(200)
        .json(
          format_json(
            200,
            true,
            null,
            null,
            'Clinic retrieved successfully',
            clinic,
          ),
        );
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

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'manager', 'operator')
  @ApiOperation({ summary: 'Delete' })
  @ApiResponse({ status: 200, description: 'Success' })
  async remove(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const clinic = await this.clinicService.findOne(id);
      if (!clinic) {
        return res
          .status(404)
          .json(format_json(404, false, null, null, 'Clinic not found', null));
      }

      await this.clinicService.removeClinic(id);
      return res
        .status(200)
        .json(
          format_json(
            200,
            true,
            null,
            null,
            'Clinic deleted successfully',
            null,
          ),
        );
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
}
