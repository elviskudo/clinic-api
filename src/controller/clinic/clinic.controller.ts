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
} from '@nestjs/common';

import { ClinicService } from 'src/service/clinic/clinic.service';
import { UpdateClinicDto } from 'src/dto/clinic/update.clinic.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/middleware/role.guard';
import { Roles } from 'src/middleware/role.decorator';
import { format_json } from 'src/env';
import { ClinicDto } from 'src/dto/clinic/clinic.dto';
import { Request, Response } from 'express';

@Controller('api/clinics')
export class ClinicController {
  constructor(private readonly clinicService: ClinicService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'manager', 'operator')
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
    } catch (error) {
      return res
        .status(400)
        .json(
          format_json(
            400,
            false,
            'Bad Request',
            null,
            'Failed to create clinic',
            error,
          ),
        );
    }
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'manager', 'operator')
  async update(
    @Param('id') id: string,
    @Body() updateClinicDto: UpdateClinicDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const clinic = await this.clinicService.findOne(+id);
      if (!clinic) {
        return res
          .status(404)
          .json(format_json(404, false, null, null, 'Clinic not found', null));
      }

      const updatedClinic = await this.clinicService.updateClinic(
        +id,
        updateClinicDto,
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
    } catch (error) {
      return res
        .status(400)
        .json(
          format_json(
            400,
            false,
            'Bad Request',
            null,
            'Failed to update clinic',
            error,
          ),
        );
    }
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'manager', 'operator', 'patient', 'doctor', 'guest')
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
    } catch (error) {
      return res
        .status(500)
        .json(
          format_json(
            500,
            false,
            'Internal Server Error',
            null,
            'Failed to retrieve clinics',
            error,
          ),
        );
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'manager', 'operator', 'patient', 'doctor', 'guest')
  async findOne(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const clinic = await this.clinicService.findOne(+id);
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
    } catch (error) {
      return res
        .status(500)
        .json(
          format_json(
            500,
            false,
            'Internal Server Error',
            null,
            'Failed to retrieve clinic',
            error,
          ),
        );
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'manager', 'operator')
  async remove(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const clinic = await this.clinicService.findOne(+id);
      if (!clinic) {
        return res
          .status(404)
          .json(format_json(404, false, null, null, 'Clinic not found', null));
      }

      await this.clinicService.removeClinic(+id);
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
    } catch (error) {
      return res
        .status(500)
        .json(
          format_json(
            500,
            false,
            'Internal Server Error',
            null,
            'Failed to delete clinic',
            error,
          ),
        );
    }
  }
}
