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
  HttpException,
  UsePipes,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { RolesGuard } from 'src/middleware/role.guard';
import { Roles } from 'src/middleware/role.decorator';
import { format_json } from 'src/env';
import { PolyDto } from 'src/dto/clinic/poly.dto';
import { UpdatePolyDto } from 'src/dto/clinic/update.poly.dto';
import { PolyService } from 'src/service/clinic/poly.service';
import { CustomValidationPipe } from 'src/custom-validation.pipe';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Polies')
@Controller('api/polies')
export class PolyController {
  constructor(private readonly polyService: PolyService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UsePipes(CustomValidationPipe)
  @Roles('admin', 'manager', 'operator')
  @ApiOperation({ summary: 'Create' })
 @ApiResponse({
  status: 201,
  description: 'success',
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 201 },
      success: { type: 'boolean', example: true },
      errors: { type: 'object', example: null },
      meta: { type: 'object', example: null },
      message: { type: 'string', example: 'Poly created successfully' },
      data: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'd06ff337-18a0-4a77-9b7c-090eed3591d1' },
          name: { type: 'string', example: 'Teeth' },
          description: { type: 'string', example: 'Clinic for teeth care' },
          clinic_id: { type: 'string', example: null },
          clinic: {
            type: 'object',
            properties: {
              id: { type: 'string', example: '11c3a62b-6962-4458-b7a4-e2b6f1a63b30' },
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
                }
              }
            }
          }
        }
      }
    }
  }
})
  async create(@Body() polyDto: PolyDto, @Res() res: Response) {
    try {
      const createdPoly = await this.polyService.createPoly(polyDto);
      if (createdPoly.status === true) {
        return res.status(201).json(format_json(
          200,
          false,
          null,
          null,
          'poly created Success',
          createdPoly.data,
        ));
      } else {
        return res.status(400).json(format_json(
          400,
          false,
          createdPoly.errors,
          null,
          createdPoly.message,
          null,
        ));
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
  @UsePipes(CustomValidationPipe)
  @Roles('admin', 'manager', 'operator')
  @ApiOperation({ summary: 'Update' })
 @ApiResponse({
  status: 201,
  description: 'success',
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 201 },
      success: { type: 'boolean', example: true },
      errors: { type: 'object', example: null },
      meta: { type: 'object', example: null },
      message: { type: 'string', example: 'Poly created successfully' },
      data: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'd06ff337-18a0-4a77-9b7c-090eed3591d1' },
          name: { type: 'string', example: 'Teeth' },
          description: { type: 'string', example: 'Clinic for teeth care' },
          clinic_id: { type: 'string', example: null },
          clinic: {
            type: 'object',
            properties: {
              id: { type: 'string', example: '11c3a62b-6962-4458-b7a4-e2b6f1a63b30' },
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
                }
              }
            }
          }
        }
      }
    }
  }
})
  async update(
    @Param('id') id: string,
    @Body() updatePolyDto: UpdatePolyDto,
    @Res() res: Response,
  ) {
    try {
      const updatedPoly = await this.polyService.updatePoly(id, updatePolyDto);
      if (updatedPoly.status === true) {
        return res.status(201).json(format_json(
          200,
          false,
          null,
          null,
          'poly update Success',
          updatedPoly.data,
        ));
      } else {
        return res.status(400).json(format_json(
          400,
          false,
          updatedPoly.errors,
          null,
          updatedPoly.message,
          null,
        ));
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

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'manager', 'operator', 'patient', 'doctor', 'guest')
  @ApiOperation({ summary: 'Get' })
 @ApiResponse({
  status: 201,
  description: 'success',
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 201 },
      success: { type: 'boolean', example: true },
      errors: { type: 'object', example: null },
      meta: { type: 'object', example: null },
      message: { type: 'string', example: 'Poly created successfully' },
      data: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'd06ff337-18a0-4a77-9b7c-090eed3591d1' },
          name: { type: 'string', example: 'Teeth' },
          description: { type: 'string', example: 'Clinic for teeth care' },
          clinic_id: { type: 'string', example: null },
          clinic: {
            type: 'object',
            properties: {
              id: { type: 'string', example: '11c3a62b-6962-4458-b7a4-e2b6f1a63b30' },
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
                }
              }
            }
          }
        }
      }
    }
  }
})
  async findAll(@Res() res: Response) {
    try {
      const polies = await this.polyService.findAll();
      return res
        .status(200)
        .json(
          format_json(
            200,
            true,
            null,
            null,
            'Polies retrieved successfully',
            polies,
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
  @ApiOperation({ summary: 'Details' })
 @ApiResponse({
  status: 201,
  description: 'success',
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 201 },
      success: { type: 'boolean', example: true },
      errors: { type: 'object', example: null },
      meta: { type: 'object', example: null },
      message: { type: 'string', example: 'Poly created successfully' },
      data: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'd06ff337-18a0-4a77-9b7c-090eed3591d1' },
          name: { type: 'string', example: 'Teeth' },
          description: { type: 'string', example: 'Clinic for teeth care' },
          clinic_id: { type: 'string', example: null },
          clinic: {
            type: 'object',
            properties: {
              id: { type: 'string', example: '11c3a62b-6962-4458-b7a4-e2b6f1a63b30' },
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
                }
              }
            }
          }
        }
      }
    }
  }
})
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const poly = await this.polyService.findOne(id);
      return res
        .status(200)
        .json(
          format_json(
            200,
            true,
            null,
            null,
            'Poly retrieved successfully',
            poly,
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
 @ApiResponse({
  status: 201,
  description: 'success',
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 201 },
      success: { type: 'boolean', example: true },
      errors: { type: 'object', example: null },
      meta: { type: 'object', example: null },
      message: { type: 'string', example: 'Poly created successfully' },
      data: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'd06ff337-18a0-4a77-9b7c-090eed3591d1' },
          name: { type: 'string', example: 'Teeth' },
          description: { type: 'string', example: 'Clinic for teeth care' },
          clinic_id: { type: 'string', example: null },
          clinic: {
            type: 'object',
            properties: {
              id: { type: 'string', example: '11c3a62b-6962-4458-b7a4-e2b6f1a63b30' },
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
                }
              }
            }
          }
        }
      }
    }
  }
})
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.polyService.removePoly(id);
      return res
        .status(200)
        .json(
          format_json(200, true, null, null, 'Poly deleted successfully', null),
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
