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
  Req,
  UsePipes,
  Query
} from '@nestjs/common';
import { Response, Request } from 'express';
import { format_json } from 'src/env';
import { SummaryDto } from 'src/dto/summary/summary.dto';
import { SummaryService } from 'src/service/summary/summary.service';
import { AuthGuard } from '@nestjs/passport';
import { UpdateSummaryDto } from 'src/dto/summary/update.summary.dto';
import { CustomValidationPipe } from 'src/custom-validation.pipe';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/middleware/role.guard';
import { Status } from '@prisma/client';

@ApiTags('Appointments / Summary')
@Controller('api/users')
export class SummaryController {
  constructor(private readonly summaryService: SummaryService) {}

 @Get('appointments')
 @UseGuards(AuthGuard('jwt'), RolesGuard)
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
      message: { type: 'string', example: 'Success' },
      data: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'e58f0b77-b93c-45b6-9c86-b6e17db86e20' },
          poly_id: { type: 'string', example: '37fbb671-cb19-4168-8b82-6aa71ad3b56e' },
          doctor_id: { type: 'string', example: 'd398f75a-8049-4b48-8f7b-48172e79e30a' },
          scheduled_date_time: { type: 'string', example: '2024-06-15T14:30:00.000Z' },
          qr_code: { type: 'string', example: 'QR123456' },
          image_captured_checked: { type: 'boolean', example: true },
          patient_id: { type: 'string', example: '60a23769-2e28-416f-a028-22af012bfb57' },
          approved_by_doctor_id: { type: 'string', example: null },
          symptoms: { type: 'string', example: 'Fever' },
          symptoms_description: { type: 'string', example: 'High fever for the past 3 days' },
          status: { type: 'string', example: 'diagnosed' },
          ai_status: { type: 'boolean', example: false },
          ai_response: { type: 'string', example: 'Hello aku ilham' },
          image_url: { type: 'string', example: 'http://example.com/image.jpg' },
          ai_token: { type: 'string', example: 'token123' },
          drug: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                qty: { type: 'number', example: 5 },
                drug_id: { type: 'string', example: '1' }
              }
            }
          },
          poly: {
            type: 'object',
            properties: {
              clinic: {
                type: 'object',
                properties: {
                  id: { type: 'string', example: '081c570a-2045-49fa-82b5-ad9e9d4dcc28' },
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
                      provinsi: { type: 'string', example: 'JAWA TIMUR' },
                      kabupaten: { type: 'string', example: 'KAB. MALANG' },
                      kecamatan: { type: 'string', example: 'AMPELGADING' },
                      kelurahan: { type: 'string', example: 'WIROTAMAN' }
                    }
                  }
                }
              }
            }
          },
          doctor: {
            type: 'object',
            properties: {
              poly: {
                type: 'object',
                properties: {
                  clinic: {
                    type: 'object',
                    properties: {
                      id: { type: 'string', example: '081c570a-2045-49fa-82b5-ad9e9d4dcc28' },
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
                          provinsi: { type: 'string', example: 'JAWA TIMUR' },
                          kabupaten: { type: 'string', example: 'KAB. MALANG' },
                          kecamatan: { type: 'string', example: 'AMPELGADING' },
                          kelurahan: { type: 'string', example: 'WIROTAMAN' }
                        }
                      }
                    }
                  }
                }
              },
              wilayah_id: { type: 'number', example: 1101012001 },
              city: {
                type: 'object',
                properties: {
                  id: { type: 'number', example: 1101012001 },
                  provinsi: { type: 'string', example: 'ACEH' },
                  kabupaten: { type: 'string', example: 'KAB. ACEH SELATAN' },
                  kecamatan: { type: 'string', example: 'BAKONGAN' },
                  kelurahan: { type: 'string', example: 'KEUDE BAKONGAN' }
                }
              }
            }
          },
          patient: {
            type: 'object',
            properties: {
              city: {
                type: 'object',
                properties: {
                  id: { type: 'string', example: '60a23769-2e28-416f-a028-22af012bfb57' },
                  fullname: { type: 'string', example: 'Admin' },
                  phone_number: { type: 'string', example: '1234567894' },
                  profil_image: { type: 'string', example: 'https://api.dicebear.com/8.x/notionists/svg?seed=Admin' },
                  no_identity: { type: 'string', example: null },
                  birth_date: { type: 'string', example: null },
                  birth_place: { type: 'string', example: null },
                  address: { type: 'string', example: null },
                  gender: { type: 'string', example: null },
                  work_in: { type: 'string', example: null },
                  blood_type: { type: 'string', example: null },
                  marital_status: { type: 'string', example: null },
                  nationality: { type: 'string', example: null },
                  religion: { type: 'string', example: null },
                  user_id: { type: 'string', example: '31ab3d21-f7ff-48b7-8953-a48c8298e819' },
                  city_id: { type: 'number', example: 0 },
                  neighborhood_no: { type: 'string', example: null },
                  citizen_no: { type: 'string', example: null },
                  area_code: { type: 'string', example: null },
                  responsibleForCosts: { type: 'string', example: null },
                  user: {
                    type: 'object',
                    properties: {
                      id: { type: 'string', example: '31ab3d21-f7ff-48b7-8953-a48c8298e819' },
                      email: { type: 'string', example: 'taztaz@gmail.com' },
                      password: { type: 'string', example: '$2b$10$dbJ2tjoyarF9usrOGwayy.wO10cu/WyXz11Wn2r4qEGSUyN0Dtutq' },
                      role_id: { type: 'string', example: 'b8da868c-b946-4c7e-b18b-49520ee4e774' },
                      verifed: { type: 'number', example: 1 },
                      created_at: { type: 'string', example: '2024-07-15T02:54:09.438Z' },
                      updated_at: { type: 'string', example: '2024-07-15T02:54:09.438Z' }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
})
@ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
@ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
@ApiQuery({ name: 'order', required: false, enum: ['asc', 'desc'], example: 'asc' })
@ApiQuery({ name: 'filter', required: false, enum: ['waiting', 'diagnosed','checkout', 'completed', 'rejected'], example: 'asc' })
  async getapp(
  @Query('page') page: number = null,
  @Query('limit') limit: number = null,
  @Query('order') order: 'asc' | 'desc' = 'asc',
  @Query('filter') status: Status,@Res() res: Response, @Req() req: Request) {
    try {
      const authorizationHeader = req.headers['authorization'];

      if (!authorizationHeader) {
        console.log('Authorization header is missing');
        return res.status(400).json(
          format_json(
            400,
            false,
            null,
            null,
            'Authorization header is missing',
            null,
          )
        );
      }

      const token = authorizationHeader.split(' ')[1];

      if (!token) {
        console.log('Bearer token is missing');
        return res.status(400).json(
          format_json(400, false, null, null, 'Bearer token is missing', null)
        );
      }

      const getdata = await this.summaryService.getappointments(token,page,limit,order,status);

      if (getdata.status) {
        return res.status(200).json(
          format_json(200, true, null, null, 'Success', getdata.data)
        );
      } else {
        return res.status(400).json(
          format_json(400, false, null, null, 'Error Server', getdata.data)
        );
      }
    } catch (error) {
      console.error('Server Error:', error);
      return res.status(400).json(
        format_json(400, false, true, null, 'Server Error '+error, error)
      );
    }
  }

  @Get('appointments/:id')
 @UseGuards(AuthGuard('jwt'), RolesGuard)
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
      message: { type: 'string', example: 'Success' },
      data: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'e58f0b77-b93c-45b6-9c86-b6e17db86e20' },
          poly_id: { type: 'string', example: '37fbb671-cb19-4168-8b82-6aa71ad3b56e' },
          doctor_id: { type: 'string', example: 'd398f75a-8049-4b48-8f7b-48172e79e30a' },
          scheduled_date_time: { type: 'string', example: '2024-06-15T14:30:00.000Z' },
          qr_code: { type: 'string', example: 'QR123456' },
          image_captured_checked: { type: 'boolean', example: true },
          patient_id: { type: 'string', example: '60a23769-2e28-416f-a028-22af012bfb57' },
          approved_by_doctor_id: { type: 'string', example: null },
          symptoms: { type: 'string', example: 'Fever' },
          symptoms_description: { type: 'string', example: 'High fever for the past 3 days' },
          status: { type: 'string', example: 'diagnosed' },
          ai_status: { type: 'boolean', example: false },
          ai_response: { type: 'string', example: 'Hello aku ilham' },
          image_url: { type: 'string', example: 'http://example.com/image.jpg' },
          ai_token: { type: 'string', example: 'token123' },
          drug: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                qty: { type: 'number', example: 5 },
                drug_id: { type: 'string', example: '1' }
              }
            }
          },
          poly: {
            type: 'object',
            properties: {
              clinic: {
                type: 'object',
                properties: {
                  id: { type: 'string', example: '081c570a-2045-49fa-82b5-ad9e9d4dcc28' },
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
                      provinsi: { type: 'string', example: 'JAWA TIMUR' },
                      kabupaten: { type: 'string', example: 'KAB. MALANG' },
                      kecamatan: { type: 'string', example: 'AMPELGADING' },
                      kelurahan: { type: 'string', example: 'WIROTAMAN' }
                    }
                  }
                }
              }
            }
          },
          doctor: {
            type: 'object',
            properties: {
              poly: {
                type: 'object',
                properties: {
                  clinic: {
                    type: 'object',
                    properties: {
                      id: { type: 'string', example: '081c570a-2045-49fa-82b5-ad9e9d4dcc28' },
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
                          provinsi: { type: 'string', example: 'JAWA TIMUR' },
                          kabupaten: { type: 'string', example: 'KAB. MALANG' },
                          kecamatan: { type: 'string', example: 'AMPELGADING' },
                          kelurahan: { type: 'string', example: 'WIROTAMAN' }
                        }
                      }
                    }
                  }
                }
              },
              wilayah_id: { type: 'number', example: 1101012001 },
              city: {
                type: 'object',
                properties: {
                  id: { type: 'number', example: 1101012001 },
                  provinsi: { type: 'string', example: 'ACEH' },
                  kabupaten: { type: 'string', example: 'KAB. ACEH SELATAN' },
                  kecamatan: { type: 'string', example: 'BAKONGAN' },
                  kelurahan: { type: 'string', example: 'KEUDE BAKONGAN' }
                }
              }
            }
          },
          patient: {
            type: 'object',
            properties: {
              city: {
                type: 'object',
                properties: {
                  id: { type: 'string', example: '60a23769-2e28-416f-a028-22af012bfb57' },
                  fullname: { type: 'string', example: 'Admin' },
                  phone_number: { type: 'string', example: '1234567894' },
                  profil_image: { type: 'string', example: 'https://api.dicebear.com/8.x/notionists/svg?seed=Admin' },
                  no_identity: { type: 'string', example: null },
                  birth_date: { type: 'string', example: null },
                  birth_place: { type: 'string', example: null },
                  address: { type: 'string', example: null },
                  gender: { type: 'string', example: null },
                  work_in: { type: 'string', example: null },
                  blood_type: { type: 'string', example: null },
                  marital_status: { type: 'string', example: null },
                  nationality: { type: 'string', example: null },
                  religion: { type: 'string', example: null },
                  user_id: { type: 'string', example: '31ab3d21-f7ff-48b7-8953-a48c8298e819' },
                  city_id: { type: 'number', example: 0 },
                  neighborhood_no: { type: 'string', example: null },
                  citizen_no: { type: 'string', example: null },
                  area_code: { type: 'string', example: null },
                  responsibleForCosts: { type: 'string', example: null },
                  user: {
                    type: 'object',
                    properties: {
                      id: { type: 'string', example: '31ab3d21-f7ff-48b7-8953-a48c8298e819' },
                      email: { type: 'string', example: 'taztaz@gmail.com' },
                      password: { type: 'string', example: '$2b$10$dbJ2tjoyarF9usrOGwayy.wO10cu/WyXz11Wn2r4qEGSUyN0Dtutq' },
                      role_id: { type: 'string', example: 'b8da868c-b946-4c7e-b18b-49520ee4e774' },
                      verifed: { type: 'number', example: 1 },
                      created_at: { type: 'string', example: '2024-07-15T02:54:09.438Z' },
                      updated_at: { type: 'string', example: '2024-07-15T02:54:09.438Z' }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
})
  async detailapp(
  @Param('id') id: string,@Res() res: Response, @Req() req: Request) {
    try {
      const authorizationHeader = req.headers['authorization'];

      if (!authorizationHeader) {
        console.log('Authorization header is missing');
        return res.status(400).json(
          format_json(
            400,
            false,
            null,
            null,
            'Authorization header is missing',
            null,
          )
        );
      }

      const token = authorizationHeader.split(' ')[1];

      if (!token) {
        console.log('Bearer token is missing');
        return res.status(400).json(
          format_json(400, false, null, null, 'Bearer token is missing', null)
        );
      }

      const getdata = await this.summaryService.detailappointments(id,token);

      if (getdata.status) {
        return res.status(200).json(
          format_json(200, true, null, null, 'Success', getdata.data)
        );
      } else {
        return res.status(400).json(
          format_json(400, false, null, getdata.data, 'Error Server', null)
        );
      }
    } catch (error) {
      console.error('Server Error:', error);
      return res.status(400).json(
        format_json(400, false, true, null, 'Server Error '+error, error)
      );
    }
  }

  @Post('appointments')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UsePipes(CustomValidationPipe)
  @ApiOperation({ summary: 'Create update' })
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
        message: { type: 'string', example: 'Success' },
        data: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'e58f0b77-b93c-45b6-9c86-b6e17db86e20' },
            poly_id: { type: 'string', example: '37fbb671-cb19-4168-8b82-6aa71ad3b56e' },
            doctor_id: { type: 'string', example: 'd398f75a-8049-4b48-8f7b-48172e79e30a' },
            scheduled_date_time: { type: 'string', example: '2024-06-15T14:30:00.000Z' },
            qr_code: { type: 'string', example: 'QR123456' },
            image_captured_checked: { type: 'boolean', example: true },
            patient_id: { type: 'string', example: '60a23769-2e28-416f-a028-22af012bfb57' },
            approved_by_doctor_id: { type: 'string', example: null },
            symptoms: { type: 'string', example: 'Fever' },
            symptoms_description: { type: 'string', example: 'High fever for the past 3 days' },
            status: { type: 'string', example: 'diagnosed' },
            ai_status: { type: 'boolean', example: false },
            ai_response: { type: 'string', example: 'Hello aku ilham' },
            image_url: { type: 'string', example: 'http://example.com/image.jpg' },
            ai_token: { type: 'string', example: 'token123' },
            drug: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  qty: { type: 'number', example: 5 },
                  drug_id: { type: 'string', example: '1' }
                }
              }
            },
            poly: {
              type: 'object',
              properties: {
                clinic: {
                  type: 'object',
                  properties: {
                    id: { type: 'string', example: '081c570a-2045-49fa-82b5-ad9e9d4dcc28' },
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
                        provinsi: { type: 'string', example: 'JAWA TIMUR' },
                        kabupaten: { type: 'string', example: 'KAB. MALANG' },
                        kecamatan: { type: 'string', example: 'AMPELGADING' },
                        kelurahan: { type: 'string', example: 'WIROTAMAN' }
                      }
                    }
                  }
                }
              }
            },
            doctor: {
              type: 'object',
              properties: {
                poly: {
                  type: 'object',
                  properties: {
                    clinic: {
                      type: 'object',
                      properties: {
                        id: { type: 'string', example: '081c570a-2045-49fa-82b5-ad9e9d4dcc28' },
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
                            provinsi: { type: 'string', example: 'JAWA TIMUR' },
                            kabupaten: { type: 'string', example: 'KAB. MALANG' },
                            kecamatan: { type: 'string', example: 'AMPELGADING' },
                            kelurahan: { type: 'string', example: 'WIROTAMAN' }
                          }
                        }
                      }
                    }
                  }
                },
                wilayah_id: { type: 'number', example: 1101012001 },
                city: {
                  type: 'object',
                  properties: {
                    id: { type: 'number', example: 1101012001 },
                    provinsi: { type: 'string', example: 'ACEH' },
                    kabupaten: { type: 'string', example: 'KAB. ACEH SELATAN' },
                    kecamatan: { type: 'string', example: 'BAKONGAN' },
                    kelurahan: { type: 'string', example: 'KEUDE BAKONGAN' }
                  }
                }
              }
            },
            patient: {
              type: 'object',
              properties: {
                city: {
                  type: 'object',
                  properties: {
                    id: { type: 'string', example: '60a23769-2e28-416f-a028-22af012bfb57' },
                    fullname: { type: 'string', example: 'Admin' },
                    phone_number: { type: 'string', example: '1234567894' },
                    profil_image: { type: 'string', example: 'https://api.dicebear.com/8.x/notionists/svg?seed=Admin' },
                    no_identity: { type: 'string', example: null },
                    birth_date: { type: 'string', example: null },
                    birth_place: { type: 'string', example: null },
                    address: { type: 'string', example: null },
                    gender: { type: 'string', example: null },
                    work_in: { type: 'string', example: null },
                    blood_type: { type: 'string', example: null },
                    marital_status: { type: 'string', example: null },
                    nationality: { type: 'string', example: null },
                    religion: { type: 'string', example: null },
                    user_id: { type: 'string', example: '31ab3d21-f7ff-48b7-8953-a48c8298e819' },
                    city_id: { type: 'number', example: 0 },
                    neighborhood_no: { type: 'string', example: null },
                    citizen_no: { type: 'string', example: null },
                    area_code: { type: 'string', example: null },
                    responsibleForCosts: { type: 'string', example: null },
                    user: {
                      type: 'object',
                      properties: {
                        id: { type: 'string', example: '31ab3d21-f7ff-48b7-8953-a48c8298e819' },
                        email: { type: 'string', example: 'taztaz@gmail.com' },
                        password: { type: 'string', example: '$2b$10$dbJ2tjoyarF9usrOGwayy.wO10cu/WyXz11Wn2r4qEGSUyN0Dtutq' },
                        role_id: { type: 'string', example: 'b8da868c-b946-4c7e-b18b-49520ee4e774' },
                        verifed: { type: 'number', example: 1 },
                        created_at: { type: 'string', example: '2024-07-15T02:54:09.438Z' },
                        updated_at: { type: 'string', example: '2024-07-15T02:54:09.438Z' }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  })
  async create(@Body() summaryDto: SummaryDto, @Res() res: Response, @Req() req: Request) {
    try {
      const authorizationHeader = req.headers['authorization'];

      if (!authorizationHeader) {
        console.log('Authorization header is missing');
        return res.status(400).json(
          format_json(
            400,
            false,
            null,
            null,
            'Authorization header is missing',
            null,
          )
        );
      }

      const token = authorizationHeader.split(' ')[1];

      if (!token) {
        console.log('Bearer token is missing');
        return res.status(400).json(
          format_json(400, false, null, null, 'Bearer token is missing', null)
        );
      }

      const create = await this.summaryService.createSummary(token, summaryDto);

      if (create.status) {
        return res.status(200).json(
          format_json(200, true, null, null, 'Success', create.data)
        );
      } else {
        return res.status(400).json(
          format_json(400, false, null, create.data, 'Error Server', null)
        );
      }
    } catch (error) {
      console.error('Server Error:', error);
      return res.status(400).json(
        format_json(400, false, true, null, 'Server Error '+error, error)
      );
    }
  }
}
