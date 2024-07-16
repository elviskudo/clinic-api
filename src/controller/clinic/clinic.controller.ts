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
import { Request, response, Response } from 'express';
import { CustomValidationPipe } from 'src/custom-validation.pipe';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Clinic')
@Controller('api/clinics')
export class ClinicController {
  constructor(private readonly clinicService: ClinicService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UsePipes(CustomValidationPipe)
  @Roles('admin', 'manager', 'operator')
  @ApiOperation({ summary: 'Create' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: 200 },
        success: { type: 'boolean', example: true },
        errors: { type: 'object', example: null },
        meta: { type: 'object', example: null },
        message: { type: 'string', example: 'Clinic retrieved successfully' },
        data: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: '431fa01e-ece4-4027-91ea-4ff48b6a677a',
            },
            clinic_name: { type: 'string', example: 'Klinik Tongz' },
            description: { type: 'string', example: 'Deskripsi Klinik' },
            address: { type: 'string', example: 'jl.arjosari' },
            post_code: { type: 'string', example: '12345' },
            latitude: { type: 'number', example: 123456 },
            longitude: { type: 'number', example: 123456 },
            city_id: { type: 'number', example: 3507062002 },
            city: {
              type: 'object',
              properties: {
                id: { type: 'number', example: 3507062002 },
                provinsi: { type: 'string', example: '' },
                kabupaten: { type: 'string', example: '' },
                kecamatan: { type: 'string', example: '' },
                kelurahan: { type: 'string', example: '' },
              },
            },
          },
        },
      },
    },
  })
  async create(
    @Body() clinicDto: ClinicDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const createdClinic = await this.clinicService.createClinic(clinicDto);
      if (createdClinic.status === true) {
        return res
          .status(201)
          .json(
            format_json(
              200,
              false,
              null,
              null,
              'clinic Created Success',
              createdClinic.data,
            ),
          );
      } else {
        return res
          .status(400)
          .json(
            format_json(
              400,
              false,
              createdClinic.errors,
              null,
              createdClinic.message,
              null,
            ),
          );
      }
    } catch (error: any) {
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
  @ApiResponse({
    status: 200,
    description: 'Success',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: 200 },
        success: { type: 'boolean', example: true },
        errors: { type: 'object', example: null },
        meta: { type: 'object', example: null },
        message: { type: 'string', example: 'Clinic retrieved successfully' },
        data: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: '431fa01e-ece4-4027-91ea-4ff48b6a677a',
            },
            clinic_name: { type: 'string', example: 'Klinik Tongz' },
            description: { type: 'string', example: 'Deskripsi Klinik' },
            address: { type: 'string', example: 'jl.arjosari' },
            post_code: { type: 'string', example: '12345' },
            latitude: { type: 'number', example: 123456 },
            longitude: { type: 'number', example: 123456 },
            city_id: { type: 'number', example: 3507062002 },
            city: {
              type: 'object',
              properties: {
                id: { type: 'number', example: 3507062002 },
                provinsi: { type: 'string', example: '' },
                kabupaten: { type: 'string', example: '' },
                kecamatan: { type: 'string', example: '' },
                kelurahan: { type: 'string', example: '' },
              },
            },
          },
        },
      },
    },
  })
  @ApiSecurity('bearer')
  @ApiBearerAuth()
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

      const updatedClinic = await this.clinicService.updateClinic(
        id,
        updateClinicDto,
      );
      if (updatedClinic.status === true) {
        return res
          .status(201)
          .json(
            format_json(
              200,
              false,
              null,
              null,
              'clinic update Success',
              updatedClinic.data,
            ),
          );
      } else {
        return res
          .status(400)
          .json(
            format_json(
              400,
              false,
              updatedClinic.errors,
              null,
              updatedClinic.message,
              null,
            ),
          );
      }
    } catch (error: any) {
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
  @ApiResponse({
    status: 200,
    description: 'Success',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: 200 },
        success: { type: 'boolean', example: true },
        errors: { type: 'object', example: null },
        meta: { type: 'object', example: null },
        message: { type: 'string', example: 'Clinic retrieved successfully' },
        data: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: '431fa01e-ece4-4027-91ea-4ff48b6a677a',
            },
            clinic_name: { type: 'string', example: 'Klinik Tongz' },
            description: { type: 'string', example: 'Deskripsi Klinik' },
            address: { type: 'string', example: 'jl.arjosari' },
            post_code: { type: 'string', example: '12345' },
            latitude: { type: 'number', example: 123456 },
            longitude: { type: 'number', example: 123456 },
            city_id: { type: 'number', example: 3507062002 },
            city: {
              type: 'object',
              properties: {
                id: { type: 'number', example: 3507062002 },
                provinsi: { type: 'string', example: '' },
                kabupaten: { type: 'string', example: '' },
                kecamatan: { type: 'string', example: '' },
                kelurahan: { type: 'string', example: '' },
              },
            },
          },
        },
      },
    },
  })
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
    } catch (error: any) {
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
  @ApiResponse({
    status: 200,
    description: 'Success',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: 200 },
        success: { type: 'boolean', example: true },
        errors: { type: 'object', example: null },
        meta: { type: 'object', example: null },
        message: { type: 'string', example: 'Clinic retrieved successfully' },
        data: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: '431fa01e-ece4-4027-91ea-4ff48b6a677a',
            },
            clinic_name: { type: 'string', example: 'Klinik Tongz' },
            description: { type: 'string', example: 'Deskripsi Klinik' },
            address: { type: 'string', example: 'jl.arjosari' },
            post_code: { type: 'string', example: '12345' },
            latitude: { type: 'number', example: 123456 },
            longitude: { type: 'number', example: 123456 },
            city_id: { type: 'number', example: 3507062002 },
            city: {
              type: 'object',
              properties: {
                id: { type: 'number', example: 3507062002 },
                provinsi: { type: 'string', example: '' },
                kabupaten: { type: 'string', example: '' },
                kecamatan: { type: 'string', example: '' },
                kelurahan: { type: 'string', example: '' },
              },
            },
          },
        },
      },
    },
  })
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
    } catch (error: any) {
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
  @ApiResponse({
    status: 200,
    description: 'Success',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: 200 },
        success: { type: 'boolean', example: true },
        errors: { type: 'object', example: null },
        meta: { type: 'object', example: null },
        message: { type: 'string', example: 'Clinic retrieved successfully' },
        data: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: '431fa01e-ece4-4027-91ea-4ff48b6a677a',
            },
            clinic_name: { type: 'string', example: 'Klinik Tongz' },
            description: { type: 'string', example: 'Deskripsi Klinik' },
            address: { type: 'string', example: 'jl.arjosari' },
            post_code: { type: 'string', example: '12345' },
            latitude: { type: 'number', example: 123456 },
            longitude: { type: 'number', example: 123456 },
            city_id: { type: 'number', example: 3507062002 },
            city: {
              type: 'object',
              properties: {
                id: { type: 'number', example: 3507062002 },
                provinsi: { type: 'string', example: '' },
                kabupaten: { type: 'string', example: '' },
                kecamatan: { type: 'string', example: '' },
                kelurahan: { type: 'string', example: '' },
              },
            },
          },
        },
      },
    },
  })
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
    } catch (error: any) {
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
