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
  HttpStatus,
  Res,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/middleware/role.guard';
import { Roles } from 'src/middleware/role.decorator';
import { format_json } from 'src/env';
import { SymptomService } from 'src/service/symptom.service';
import { SymptomDto } from 'src/dto/symptom/symptom.dto';
import { UpdateSymptomDto } from 'src/dto/symptom/update.symptom.dto';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
  ApiSecurity,
} from '@nestjs/swagger';

@ApiTags('Symptoms')
@ApiSecurity('bearer')
@ApiBearerAuth()
@Controller('api/symptoms')
export class SymptomController {
  constructor(private readonly symptomService: SymptomService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'manager', 'operator')
  @ApiOperation({ summary: 'Create' })
  @ApiResponse({
    status: 201,
    description: 'Success',
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: '2312bfe1-fd15-4499-bbf7-495fbc1832f9',
        },
        name: { type: 'string', example: 'Fever' },
        description: { type: 'string', example: 'High body temperature' },
        poly_id: {
          type: 'string',
          example: '560e7ce8-6ad1-408a-b1ee-dc5ccdfd2349',
        },
        poly: {
          type: 'object',
          properties: {
            clinic: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  example: '11c3a62b-6962-4458-b7a4-e2b6f1a63b30',
                },
                clinic_name: { type: 'string', example: 'Klinik Tongz' },
                description: {
                  type: 'string',
                  example: 'Deskripsi Klinik',
                },
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
      },
    },
  })
  async create(@Res() res, @Body() symptomDto: SymptomDto) {
    try {
      const createdSymptom =
        await this.symptomService.createSymptom(symptomDto);
      return res
        .status(201)
        .json(
          format_json(
            201,
            true,
            null,
            null,
            'Symptom created successfully',
            createdSymptom,
          ),
        );
    } catch (error: any) {
      throw new HttpException(
        format_json(
          400,
          false,
          'Bad Request',
          null,
          'Failed to create symptom',
          error.message,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'manager', 'operator')
  @ApiOperation({ summary: 'Update' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: '2312bfe1-fd15-4499-bbf7-495fbc1832f9' },
        name: { type: 'string', example: 'Fever' },
        description: { type: 'string', example: 'High body temperature' },
        poly_id: {
          type: 'string',
          example: '560e7ce8-6ad1-408a-b1ee-dc5ccdfd2349',
        },
        poly: {
          type: 'object',
          properties: {
            clinic: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  example: '11c3a62b-6962-4458-b7a4-e2b6f1a63b30',
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
      },
    },
  })
  async update(
    @Res() res,
    @Param('id') id: string,
    @Body() updateSymptomDto: UpdateSymptomDto,
  ) {
    try {
      const updatedSymptom = await this.symptomService.updateSymptom(
        id,
        updateSymptomDto,
      );
      return res
        .status(200)
        .json(
          format_json(
            200,
            true,
            null,
            null,
            'Symptom updated successfully',
            updatedSymptom,
          ),
        );
    } catch (error: any) {
      throw new HttpException(
        format_json(
          400,
          false,
          'Bad Request',
          null,
          'Failed to update symptom',
          error.message,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'manager', 'operator', 'patient', 'doctor', 'guest')
  @ApiOperation({ summary: 'Get all symptoms' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: '2312bfe1-fd15-4499-bbf7-495fbc1832f9' },
        name: { type: 'string', example: 'Fever' },
        description: { type: 'string', example: 'High body temperature' },
        poly_id: {
          type: 'string',
          example: '560e7ce8-6ad1-408a-b1ee-dc5ccdfd2349',
        },
        poly: {
          type: 'object',
          properties: {
            clinic: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  example: '11c3a62b-6962-4458-b7a4-e2b6f1a63b30',
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
      },
    },
  })
  async findAll(@Res() res) {
    try {
      const symptoms = await this.symptomService.findAll();
      return res
        .status(200)
        .json(
          format_json(
            200,
            true,
            null,
            null,
            'Symptoms retrieved successfully',
            symptoms,
          ),
        );
    } catch (error: any) {
      throw new HttpException(
        format_json(
          400,
          false,
          'Bad Request',
          null,
          'Failed to retrieve symptoms',
          error.message,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'manager', 'operator', 'patient', 'doctor', 'guest')
  @ApiOperation({ summary: 'Get symptom details' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: '2312bfe1-fd15-4499-bbf7-495fbc1832f9' },
        name: { type: 'string', example: 'Fever' },
        description: { type: 'string', example: 'High body temperature' },
        poly_id: {
          type: 'string',
          example: '560e7ce8-6ad1-408a-b1ee-dc5ccdfd2349',
        },
        poly: {
          type: 'object',
          properties: {
            clinic: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  example: '11c3a62b-6962-4458-b7a4-e2b6f1a63b30',
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
      },
    },
  })
  async findOne(@Res() res, @Param('id') id: string) {
    try {
      const symptom = await this.symptomService.findOne(id);
      if (!symptom) {
        throw new HttpException(
          format_json(404, false, 'Not Found', null, 'Symptom not found', null),
          HttpStatus.NOT_FOUND,
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
            'Symptom retrieved successfully',
            symptom,
          ),
        );
    } catch (error: any) {
      throw new HttpException(
        format_json(
          400,
          false,
          'Bad Request',
          null,
          'Failed to retrieve symptom',
          error.message,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'manager', 'operator')
  @ApiOperation({ summary: 'Delete symptom' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: '2312bfe1-fd15-4499-bbf7-495fbc1832f9' },
      },
    },
  })
  async remove(@Res() res, @Param('id') id: string) {
    try {
      await this.symptomService.removeSymptom(id);
      return res
        .status(200)
        .json(
          format_json(
            200,
            true,
            null,
            null,
            'Symptom deleted successfully',
            null,
          ),
        );
    } catch (error: any) {
      throw new HttpException(
        format_json(
          400,
          false,
          'Bad Request',
          null,
          'Failed to delete symptom',
          error.message,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
