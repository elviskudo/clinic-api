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
  Query,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { RolesGuard } from 'src/middleware/role.guard';
import { Roles } from 'src/middleware/role.decorator';
import { format_json } from 'src/env';
import { DoctorService } from 'src/service/clinic/doctor.service';
import { UpdateDoctorDto } from 'src/dto/clinic/update.doctor.dto';
import { DoctorDto } from 'src/dto/clinic/doctor.dto';
import { CustomValidationPipe } from 'src/custom-validation.pipe';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Doctor')
@Controller('api/doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UsePipes(CustomValidationPipe)
  @Roles('admin', 'manager', 'operator')
  @ApiOperation({ summary: 'Create' })
  @ApiResponse({
  status: 201,
  description: 'Success',
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 201 },
      success: { type: 'boolean', example: true },
      errors: { type: 'object', example: null },
      meta: { type: 'object', example: null },
      message: { type: 'string', example: 'Doctor created successfully' },
      data: {
        type: 'object',
        properties: {
          id: { type: 'string', example: '2312bfe1-fd15-4499-bbf7-495fbc1832f9' },
          doctor_name: { type: 'string', example: 'Dr. Whos' },
          place_of_birth: { type: 'string', example: 'malang' },
          date_of_birth: { type: 'string', example: '2023-02-23T00:00:00.000Z' },
          specialist: { type: 'string', example: 'mata' },
          graduate_of: { type: 'string', example: 'oxford' },
          bio: { type: 'string', example: 'bio' },
          document_id: { type: 'string', example: null },
          description: { type: 'string', example: 'grsiknrgeafdg' },
          address: { type: 'string', example: 'jl. gnaejhgfe' },
          post_code: { type: 'string', example: '12345' },
          latitude: { type: 'number', example: 402478 },
          longitude: { type: 'number', example: 7423879 },
          title: { type: 'string', example: 'Dr.' },
          experience: { type: 'string', example: '10 years' },
          education: { type: 'string', example: 'eaifefbj' },
          poly_id: { type: 'string', example: '560e7ce8-6ad1-408a-b1ee-dc5ccdfd2349' },
          wilayah_id: { type: 'number', example: 1101012001 },
          poly: {
            type: 'object',
            properties: {
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
          },
          city: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 1101012001 },
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
})
  async create(@Body() doctorDto: DoctorDto, @Res() res: Response) {
    try {
      const createdDoctor = await this.doctorService.createDoctor(doctorDto);
      if (createdDoctor.status === true) {
        return res.status(201).json(format_json(
          200,
          false,
          null,
          null,
          'doctor Created Success',
          createdDoctor.data,
        ));
      } else {
        return res.status(400).json(format_json(
          400,
          false,
          createdDoctor.errors,
          null,
          createdDoctor.message,
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
  description: 'Success',
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 201 },
      success: { type: 'boolean', example: true },
      errors: { type: 'object', example: null },
      meta: { type: 'object', example: null },
      message: { type: 'string', example: 'Doctor created successfully' },
      data: {
        type: 'object',
        properties: {
          id: { type: 'string', example: '2312bfe1-fd15-4499-bbf7-495fbc1832f9' },
          doctor_name: { type: 'string', example: 'Dr. Whos' },
          place_of_birth: { type: 'string', example: 'malang' },
          date_of_birth: { type: 'string', example: '2023-02-23T00:00:00.000Z' },
          specialist: { type: 'string', example: 'mata' },
          graduate_of: { type: 'string', example: 'oxford' },
          bio: { type: 'string', example: 'bio' },
          document_id: { type: 'string', example: null },
          description: { type: 'string', example: 'grsiknrgeafdg' },
          address: { type: 'string', example: 'jl. gnaejhgfe' },
          post_code: { type: 'string', example: '12345' },
          latitude: { type: 'number', example: 402478 },
          longitude: { type: 'number', example: 7423879 },
          title: { type: 'string', example: 'Dr.' },
          experience: { type: 'string', example: '10 years' },
          education: { type: 'string', example: 'eaifefbj' },
          poly_id: { type: 'string', example: '560e7ce8-6ad1-408a-b1ee-dc5ccdfd2349' },
          wilayah_id: { type: 'number', example: 1101012001 },
          poly: {
            type: 'object',
            properties: {
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
          },
          city: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 1101012001 },
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
})
  async update(
    @Param('id') id: string,
    @Body() updateDoctorDto: UpdateDoctorDto,
    @Res() res: Response,
  ) {
    try {
      const updatedDoctor = await this.doctorService.updateDoctor(
        id,
        updateDoctorDto,
      );
      if (updatedDoctor.status === true) {
        return res.status(201).json(format_json(
          200,
          false,
          null,
          null,
          'doctor update Success',
          updatedDoctor.data,
        ));
      } else {
        return res.status(400).json(format_json(
          400,
          false,
          updatedDoctor.errors,
          null,
          updatedDoctor.message,
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
  description: 'Success',
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 201 },
      success: { type: 'boolean', example: true },
      errors: { type: 'object', example: null },
      meta: { type: 'object', example: null },
      message: { type: 'string', example: 'Doctor created successfully' },
      data: {
        type: 'object',
        properties: {
          id: { type: 'string', example: '2312bfe1-fd15-4499-bbf7-495fbc1832f9' },
          doctor_name: { type: 'string', example: 'Dr. Whos' },
          place_of_birth: { type: 'string', example: 'malang' },
          date_of_birth: { type: 'string', example: '2023-02-23T00:00:00.000Z' },
          specialist: { type: 'string', example: 'mata' },
          graduate_of: { type: 'string', example: 'oxford' },
          bio: { type: 'string', example: 'bio' },
          document_id: { type: 'string', example: null },
          description: { type: 'string', example: 'grsiknrgeafdg' },
          address: { type: 'string', example: 'jl. gnaejhgfe' },
          post_code: { type: 'string', example: '12345' },
          latitude: { type: 'number', example: 402478 },
          longitude: { type: 'number', example: 7423879 },
          title: { type: 'string', example: 'Dr.' },
          experience: { type: 'string', example: '10 years' },
          education: { type: 'string', example: 'eaifefbj' },
          poly_id: { type: 'string', example: '560e7ce8-6ad1-408a-b1ee-dc5ccdfd2349' },
          wilayah_id: { type: 'number', example: 1101012001 },
          poly: {
            type: 'object',
            properties: {
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
          },
          city: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 1101012001 },
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
})
  @ApiQuery({ name: 'q', required: false, type: String })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'order', required: false, enum: ['asc', 'desc'], example: 'asc' })
  async findAll(
    @Query('q') query: string = '',
    @Query('page') page: number = null,
    @Query('limit') limit: number = null,
    @Query('order') order: 'asc' | 'desc' = 'asc',
    @Res() res: Response,
  ) {
    try {
      const doctors = await this.doctorService.findAll(
        query,
        page,
        limit,
        order,
      );
      return res
        .status(200)
        .json(
          format_json(
            200,
            true,
            null,
            null,
            'Doctors retrieved successfully',
            doctors,
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
  description: 'Success',
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 201 },
      success: { type: 'boolean', example: true },
      errors: { type: 'object', example: null },
      meta: { type: 'object', example: null },
      message: { type: 'string', example: 'Doctor created successfully' },
      data: {
        type: 'object',
        properties: {
          id: { type: 'string', example: '2312bfe1-fd15-4499-bbf7-495fbc1832f9' },
          doctor_name: { type: 'string', example: 'Dr. Whos' },
          place_of_birth: { type: 'string', example: 'malang' },
          date_of_birth: { type: 'string', example: '2023-02-23T00:00:00.000Z' },
          specialist: { type: 'string', example: 'mata' },
          graduate_of: { type: 'string', example: 'oxford' },
          bio: { type: 'string', example: 'bio' },
          document_id: { type: 'string', example: null },
          description: { type: 'string', example: 'grsiknrgeafdg' },
          address: { type: 'string', example: 'jl. gnaejhgfe' },
          post_code: { type: 'string', example: '12345' },
          latitude: { type: 'number', example: 402478 },
          longitude: { type: 'number', example: 7423879 },
          title: { type: 'string', example: 'Dr.' },
          experience: { type: 'string', example: '10 years' },
          education: { type: 'string', example: 'eaifefbj' },
          poly_id: { type: 'string', example: '560e7ce8-6ad1-408a-b1ee-dc5ccdfd2349' },
          wilayah_id: { type: 'number', example: 1101012001 },
          poly: {
            type: 'object',
            properties: {
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
          },
          city: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 1101012001 },
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
})
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const doctor = await this.doctorService.findOne(id);
      return res
        .status(200)
        .json(
          format_json(
            200,
            true,
            null,
            null,
            'Doctor retrieved successfully',
            doctor,
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
  description: 'Success',
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 201 },
      success: { type: 'boolean', example: true },
      errors: { type: 'object', example: null },
      meta: { type: 'object', example: null },
      message: { type: 'string', example: 'Doctor created successfully' },
      data: {
        type: 'object',
        properties: {
          id: { type: 'string', example: '2312bfe1-fd15-4499-bbf7-495fbc1832f9' },
          doctor_name: { type: 'string', example: 'Dr. Whos' },
          place_of_birth: { type: 'string', example: 'malang' },
          date_of_birth: { type: 'string', example: '2023-02-23T00:00:00.000Z' },
          specialist: { type: 'string', example: 'mata' },
          graduate_of: { type: 'string', example: 'oxford' },
          bio: { type: 'string', example: 'bio' },
          document_id: { type: 'string', example: null },
          description: { type: 'string', example: 'grsiknrgeafdg' },
          address: { type: 'string', example: 'jl. gnaejhgfe' },
          post_code: { type: 'string', example: '12345' },
          latitude: { type: 'number', example: 402478 },
          longitude: { type: 'number', example: 7423879 },
          title: { type: 'string', example: 'Dr.' },
          experience: { type: 'string', example: '10 years' },
          education: { type: 'string', example: 'eaifefbj' },
          poly_id: { type: 'string', example: '560e7ce8-6ad1-408a-b1ee-dc5ccdfd2349' },
          wilayah_id: { type: 'number', example: 1101012001 },
          poly: {
            type: 'object',
            properties: {
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
          },
          city: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 1101012001 },
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
})
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.doctorService.removeDoctor(id);
      return res
        .status(200)
        .json(
          format_json(
            200,
            true,
            null,
            null,
            'Doctor deleted successfully',
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
