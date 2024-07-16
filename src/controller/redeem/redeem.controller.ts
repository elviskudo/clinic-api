import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Req,
  UseGuards,
  Res,
  Body,
  Param,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { LastRedeemService } from 'src/service/latest/last.redeem.service';
import { format_json } from 'src/env';
import { CreateDTO } from 'src/dto/redeem/create.dto';
import { CustomValidationPipe } from 'src/custom-validation.pipe';
import { RolesGuard } from 'src/middleware/role.guard';
import { Roles } from 'src/middleware/role.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Redeem')
@Controller('api/users')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class RedeemController {
  constructor(private readonly lastRedeemService: LastRedeemService) {}

  @Get('redeem')
  @Roles('admin', 'manager', 'operator')
  @ApiOperation({ summary: 'get' })
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
        message: { type: 'string', example: 'Success to create data' },
        data: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: '49f2d9e6-1e16-45bc-a099-138c18217fa9',
            },
            redemption_date_and_time: {
              type: 'string',
              example: '2024-07-12T14:30:00.000Z',
            },
            list_of_medications: {
              type: 'string',
              example: '[{"medications_id":1},{"medications_id":1}]',
            },
            total_cost: { type: 'string', example: '100000' },
            bank_transfer_name: { type: 'string', example: 'John Doe' },
            bank_id: {
              type: 'string',
              example: '4e4e64df-5327-4bd4-8dc0-007df6ee3748',
            },
            user_id: {
              type: 'string',
              example: '1f4b0c0e-f297-45a7-8854-fccd7fddc5c4',
            },
            bank: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  example: '4e4e64df-5327-4bd4-8dc0-007df6ee3748',
                },
                bank_name: { type: 'string', example: 'Bank BRI' },
                account_number: { type: 'string', example: '96748638' },
                account_name: { type: 'string', example: 'Vel' },
                service_charge: { type: 'number', example: 1500 },
                handling_fee: { type: 'number', example: 3500 },
                bank_images: { type: 'string', example: null },
                bank_category_id: {
                  type: 'string',
                  example: '457beffd-b77c-4052-9ff7-06c74bde2815',
                },
              },
            },
            user: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  example: '1f4b0c0e-f297-45a7-8854-fccd7fddc5c4',
                },
                email: { type: 'string', example: 'taztaz@gmail.com' },
                password: {
                  type: 'string',
                  example:
                    '$2b$10$LVX3DrZTCX0g4B46F21qGull3Lxs.OL1vIE6cAHGGqPmbGl7EigpG',
                },
                role_id: {
                  type: 'string',
                  example: 'd789b7fd-b790-449b-b0cd-201294468ce2',
                },
                verified: { type: 'number', example: 1 },
                created_at: {
                  type: 'string',
                  example: '2024-07-11T05:54:23.483Z',
                },
                updated_at: {
                  type: 'string',
                  example: '2024-07-11T05:54:23.483Z',
                },
                profile: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'string',
                      example: '9ee5144b-54aa-4941-8ba6-f46c11a1e35d',
                    },
                    fullname: { type: 'string', example: 'Admin' },
                    phone_number: { type: 'string', example: '1234567894' },
                    profil_image: {
                      type: 'string',
                      example:
                        'https://api.dicebear.com/8.x/notionists/svg?seed=Admin',
                    },
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
                    user_id: {
                      type: 'string',
                      example: '1f4b0c0e-f297-45a7-8854-fccd7fddc5c4',
                    },
                    city_id: { type: 'string', example: null },
                    neighborhood_no: { type: 'string', example: null },
                    citizen_no: { type: 'string', example: null },
                    area_code: { type: 'string', example: null },
                    responsibleForCosts: { type: 'string', example: null },
                    city: { type: 'string', example: null },
                    user: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'string',
                          example: '1f4b0c0e-f297-45a7-8854-fccd7fddc5c4',
                        },
                        email: { type: 'string', example: 'taztaz@gmail.com' },
                        password: {
                          type: 'string',
                          example:
                            '$2b$10$LVX3DrZTCX0g4B46F21qGull3Lxs.OL1vIE6cAHGGqPmbGl7EigpG',
                        },
                        role_id: {
                          type: 'string',
                          example: 'd789b7fd-b790-449b-b0cd-201294468ce2',
                        },
                        verified: { type: 'number', example: 1 },
                        created_at: {
                          type: 'string',
                          example: '2024-07-11T05:54:23.483Z',
                        },
                        updated_at: {
                          type: 'string',
                          example: '2024-07-11T05:54:23.483Z',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  })
  async getRedeem(@Req() req: Request, @Res() res: Response) {
    try {
      const authorizationHeader = req.headers['authorization'];

      if (!authorizationHeader) {
        return res
          .status(400)
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
        return res
          .status(400)
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

      const getdata = await this.lastRedeemService.getRedeem(token);

      if (getdata.status) {
        return res
          .status(200)
          .json(
            format_json(200, true, null, null, getdata.message, getdata.data),
          );
      } else {
        return res
          .status(400)
          .json(
            format_json(400, false, null, getdata.data, getdata.message, null),
          );
      }
    } catch (error) {
      return res
        .status(400)
        .json(
          format_json(400, false, true, null, 'Server Error ' + error, error),
        );
    }
  }

  @Get('redeem/:id')
  @Roles('admin', 'manager', 'operator')
  @ApiOperation({ summary: 'detail' })
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
        message: { type: 'string', example: 'Success to create data' },
        data: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: '49f2d9e6-1e16-45bc-a099-138c18217fa9',
            },
            redemption_date_and_time: {
              type: 'string',
              example: '2024-07-12T14:30:00.000Z',
            },
            list_of_medications: {
              type: 'string',
              example: '[{"medications_id":1},{"medications_id":1}]',
            },
            total_cost: { type: 'string', example: '100000' },
            bank_transfer_name: { type: 'string', example: 'John Doe' },
            bank_id: {
              type: 'string',
              example: '4e4e64df-5327-4bd4-8dc0-007df6ee3748',
            },
            user_id: {
              type: 'string',
              example: '1f4b0c0e-f297-45a7-8854-fccd7fddc5c4',
            },
            bank: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  example: '4e4e64df-5327-4bd4-8dc0-007df6ee3748',
                },
                bank_name: { type: 'string', example: 'Bank BRI' },
                account_number: { type: 'string', example: '96748638' },
                account_name: { type: 'string', example: 'Vel' },
                service_charge: { type: 'number', example: 1500 },
                handling_fee: { type: 'number', example: 3500 },
                bank_images: { type: 'string', example: null },
                bank_category_id: {
                  type: 'string',
                  example: '457beffd-b77c-4052-9ff7-06c74bde2815',
                },
              },
            },
            user: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  example: '1f4b0c0e-f297-45a7-8854-fccd7fddc5c4',
                },
                email: { type: 'string', example: 'taztaz@gmail.com' },
                password: {
                  type: 'string',
                  example:
                    '$2b$10$LVX3DrZTCX0g4B46F21qGull3Lxs.OL1vIE6cAHGGqPmbGl7EigpG',
                },
                role_id: {
                  type: 'string',
                  example: 'd789b7fd-b790-449b-b0cd-201294468ce2',
                },
                verified: { type: 'number', example: 1 },
                created_at: {
                  type: 'string',
                  example: '2024-07-11T05:54:23.483Z',
                },
                updated_at: {
                  type: 'string',
                  example: '2024-07-11T05:54:23.483Z',
                },
                profile: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'string',
                      example: '9ee5144b-54aa-4941-8ba6-f46c11a1e35d',
                    },
                    fullname: { type: 'string', example: 'Admin' },
                    phone_number: { type: 'string', example: '1234567894' },
                    profil_image: {
                      type: 'string',
                      example:
                        'https://api.dicebear.com/8.x/notionists/svg?seed=Admin',
                    },
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
                    user_id: {
                      type: 'string',
                      example: '1f4b0c0e-f297-45a7-8854-fccd7fddc5c4',
                    },
                    city_id: { type: 'string', example: null },
                    neighborhood_no: { type: 'string', example: null },
                    citizen_no: { type: 'string', example: null },
                    area_code: { type: 'string', example: null },
                    responsibleForCosts: { type: 'string', example: null },
                    city: { type: 'string', example: null },
                    user: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'string',
                          example: '1f4b0c0e-f297-45a7-8854-fccd7fddc5c4',
                        },
                        email: { type: 'string', example: 'taztaz@gmail.com' },
                        password: {
                          type: 'string',
                          example:
                            '$2b$10$LVX3DrZTCX0g4B46F21qGull3Lxs.OL1vIE6cAHGGqPmbGl7EigpG',
                        },
                        role_id: {
                          type: 'string',
                          example: 'd789b7fd-b790-449b-b0cd-201294468ce2',
                        },
                        verified: { type: 'number', example: 1 },
                        created_at: {
                          type: 'string',
                          example: '2024-07-11T05:54:23.483Z',
                        },
                        updated_at: {
                          type: 'string',
                          example: '2024-07-11T05:54:23.483Z',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  })
  async findOneRedeem(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const authorizationHeader = req.headers['authorization'];

      if (!authorizationHeader) {
        return res
          .status(400)
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
        return res
          .status(400)
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

      const getdata = await this.lastRedeemService.findOneRedeem(token, id);

      if (getdata.status) {
        return res
          .status(200)
          .json(
            format_json(200, true, null, null, getdata.message, getdata.data),
          );
      } else {
        return res
          .status(400)
          .json(
            format_json(400, false, null, getdata.data, getdata.message, null),
          );
      }
    } catch (error) {
      return res
        .status(400)
        .json(
          format_json(400, false, true, null, 'Server Error ' + error, error),
        );
    }
  }

  @Post('redeem')
  @UseGuards(AuthGuard('jwt'))
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
        message: { type: 'string', example: 'Success to create data' },
        data: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: '49f2d9e6-1e16-45bc-a099-138c18217fa9',
            },
            redemption_date_and_time: {
              type: 'string',
              example: '2024-07-12T14:30:00.000Z',
            },
            list_of_medications: {
              type: 'string',
              example: '[{"medications_id":1},{"medications_id":1}]',
            },
            total_cost: { type: 'string', example: '100000' },
            bank_transfer_name: { type: 'string', example: 'John Doe' },
            bank_id: {
              type: 'string',
              example: '4e4e64df-5327-4bd4-8dc0-007df6ee3748',
            },
            user_id: {
              type: 'string',
              example: '1f4b0c0e-f297-45a7-8854-fccd7fddc5c4',
            },
            bank: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  example: '4e4e64df-5327-4bd4-8dc0-007df6ee3748',
                },
                bank_name: { type: 'string', example: 'Bank BRI' },
                account_number: { type: 'string', example: '96748638' },
                account_name: { type: 'string', example: 'Vel' },
                service_charge: { type: 'number', example: 1500 },
                handling_fee: { type: 'number', example: 3500 },
                bank_images: { type: 'string', example: null },
                bank_category_id: {
                  type: 'string',
                  example: '457beffd-b77c-4052-9ff7-06c74bde2815',
                },
              },
            },
            user: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  example: '1f4b0c0e-f297-45a7-8854-fccd7fddc5c4',
                },
                email: { type: 'string', example: 'taztaz@gmail.com' },
                password: {
                  type: 'string',
                  example:
                    '$2b$10$LVX3DrZTCX0g4B46F21qGull3Lxs.OL1vIE6cAHGGqPmbGl7EigpG',
                },
                role_id: {
                  type: 'string',
                  example: 'd789b7fd-b790-449b-b0cd-201294468ce2',
                },
                verified: { type: 'number', example: 1 },
                created_at: {
                  type: 'string',
                  example: '2024-07-11T05:54:23.483Z',
                },
                updated_at: {
                  type: 'string',
                  example: '2024-07-11T05:54:23.483Z',
                },
                profile: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'string',
                      example: '9ee5144b-54aa-4941-8ba6-f46c11a1e35d',
                    },
                    fullname: { type: 'string', example: 'Admin' },
                    phone_number: { type: 'string', example: '1234567894' },
                    profil_image: {
                      type: 'string',
                      example:
                        'https://api.dicebear.com/8.x/notionists/svg?seed=Admin',
                    },
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
                    user_id: {
                      type: 'string',
                      example: '1f4b0c0e-f297-45a7-8854-fccd7fddc5c4',
                    },
                    city_id: { type: 'string', example: null },
                    neighborhood_no: { type: 'string', example: null },
                    citizen_no: { type: 'string', example: null },
                    area_code: { type: 'string', example: null },
                    responsibleForCosts: { type: 'string', example: null },
                    city: { type: 'string', example: null },
                    user: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'string',
                          example: '1f4b0c0e-f297-45a7-8854-fccd7fddc5c4',
                        },
                        email: { type: 'string', example: 'taztaz@gmail.com' },
                        password: {
                          type: 'string',
                          example:
                            '$2b$10$LVX3DrZTCX0g4B46F21qGull3Lxs.OL1vIE6cAHGGqPmbGl7EigpG',
                        },
                        role_id: {
                          type: 'string',
                          example: 'd789b7fd-b790-449b-b0cd-201294468ce2',
                        },
                        verified: { type: 'number', example: 1 },
                        created_at: {
                          type: 'string',
                          example: '2024-07-11T05:54:23.483Z',
                        },
                        updated_at: {
                          type: 'string',
                          example: '2024-07-11T05:54:23.483Z',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  })
  async createRedeem(
    @Body() createDTO: CreateDTO,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const authorizationHeader = req.headers['authorization'];

      if (!authorizationHeader) {
        return res
          .status(400)
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
        return res
          .status(400)
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

      const {
        redemption_date_and_time,
        list_of_medications,
        total_cost,
        bank_transfer_name,
        bank_id,
      } = createDTO;
      const create = await this.lastRedeemService.createRedeem(
        token,
        createDTO,
      );

      if (create.status) {
        return res
          .status(200)
          .json(
            format_json(200, true, null, null, create.message, create.data),
          );
      } else {
        return res
          .status(400)
          .json(
            format_json(400, false, null, create.data, create.message, null),
          );
      }
    } catch (error) {
      return res
        .status(400)
        .json(
          format_json(400, false, true, null, 'Server Error ' + error, error),
        );
    }
  }

  @Put('redeem/:id')
  @UseGuards(AuthGuard('jwt'))
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
        message: { type: 'string', example: 'Success to create data' },
        data: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: '49f2d9e6-1e16-45bc-a099-138c18217fa9',
            },
            redemption_date_and_time: {
              type: 'string',
              example: '2024-07-12T14:30:00.000Z',
            },
            list_of_medications: {
              type: 'string',
              example: '[{"medications_id":1},{"medications_id":1}]',
            },
            total_cost: { type: 'string', example: '100000' },
            bank_transfer_name: { type: 'string', example: 'John Doe' },
            bank_id: {
              type: 'string',
              example: '4e4e64df-5327-4bd4-8dc0-007df6ee3748',
            },
            user_id: {
              type: 'string',
              example: '1f4b0c0e-f297-45a7-8854-fccd7fddc5c4',
            },
            bank: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  example: '4e4e64df-5327-4bd4-8dc0-007df6ee3748',
                },
                bank_name: { type: 'string', example: 'Bank BRI' },
                account_number: { type: 'string', example: '96748638' },
                account_name: { type: 'string', example: 'Vel' },
                service_charge: { type: 'number', example: 1500 },
                handling_fee: { type: 'number', example: 3500 },
                bank_images: { type: 'string', example: null },
                bank_category_id: {
                  type: 'string',
                  example: '457beffd-b77c-4052-9ff7-06c74bde2815',
                },
              },
            },
            user: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  example: '1f4b0c0e-f297-45a7-8854-fccd7fddc5c4',
                },
                email: { type: 'string', example: 'taztaz@gmail.com' },
                password: {
                  type: 'string',
                  example:
                    '$2b$10$LVX3DrZTCX0g4B46F21qGull3Lxs.OL1vIE6cAHGGqPmbGl7EigpG',
                },
                role_id: {
                  type: 'string',
                  example: 'd789b7fd-b790-449b-b0cd-201294468ce2',
                },
                verified: { type: 'number', example: 1 },
                created_at: {
                  type: 'string',
                  example: '2024-07-11T05:54:23.483Z',
                },
                updated_at: {
                  type: 'string',
                  example: '2024-07-11T05:54:23.483Z',
                },
                profile: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'string',
                      example: '9ee5144b-54aa-4941-8ba6-f46c11a1e35d',
                    },
                    fullname: { type: 'string', example: 'Admin' },
                    phone_number: { type: 'string', example: '1234567894' },
                    profil_image: {
                      type: 'string',
                      example:
                        'https://api.dicebear.com/8.x/notionists/svg?seed=Admin',
                    },
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
                    user_id: {
                      type: 'string',
                      example: '1f4b0c0e-f297-45a7-8854-fccd7fddc5c4',
                    },
                    city_id: { type: 'string', example: null },
                    neighborhood_no: { type: 'string', example: null },
                    citizen_no: { type: 'string', example: null },
                    area_code: { type: 'string', example: null },
                    responsibleForCosts: { type: 'string', example: null },
                    city: { type: 'string', example: null },
                    user: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'string',
                          example: '1f4b0c0e-f297-45a7-8854-fccd7fddc5c4',
                        },
                        email: { type: 'string', example: 'taztaz@gmail.com' },
                        password: {
                          type: 'string',
                          example:
                            '$2b$10$LVX3DrZTCX0g4B46F21qGull3Lxs.OL1vIE6cAHGGqPmbGl7EigpG',
                        },
                        role_id: {
                          type: 'string',
                          example: 'd789b7fd-b790-449b-b0cd-201294468ce2',
                        },
                        verified: { type: 'number', example: 1 },
                        created_at: {
                          type: 'string',
                          example: '2024-07-11T05:54:23.483Z',
                        },
                        updated_at: {
                          type: 'string',
                          example: '2024-07-11T05:54:23.483Z',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  })
  async UpdateRedeem(
    @Param('id') id: string,
    @Body() createDTO: CreateDTO,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const authorizationHeader = req.headers['authorization'];

      if (!authorizationHeader) {
        return res
          .status(400)
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
        return res
          .status(400)
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

      const {
        redemption_date_and_time,
        list_of_medications,
        total_cost,
        bank_transfer_name,
        bank_id,
      } = createDTO;
      const update = await this.lastRedeemService.updateRedeem(
        token,
        createDTO,
        id,
      );

      if (update.status) {
        return res
          .status(200)
          .json(
            format_json(200, true, null, null, update.message, update.data),
          );
      } else {
        return res
          .status(400)
          .json(
            format_json(400, false, null, update.data, update.message, null),
          );
      }
    } catch (error) {
      return res
        .status(400)
        .json(
          format_json(400, false, true, null, 'Server Error ' + error, error),
        );
    }
  }

  @Delete('redeem/:id')
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
        message: { type: 'string', example: 'Success to create data' },
        data: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: '49f2d9e6-1e16-45bc-a099-138c18217fa9',
            },
            redemption_date_and_time: {
              type: 'string',
              example: '2024-07-12T14:30:00.000Z',
            },
            list_of_medications: {
              type: 'string',
              example: '[{"medications_id":1},{"medications_id":1}]',
            },
            total_cost: { type: 'string', example: '100000' },
            bank_transfer_name: { type: 'string', example: 'John Doe' },
            bank_id: {
              type: 'string',
              example: '4e4e64df-5327-4bd4-8dc0-007df6ee3748',
            },
            user_id: {
              type: 'string',
              example: '1f4b0c0e-f297-45a7-8854-fccd7fddc5c4',
            },
            bank: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  example: '4e4e64df-5327-4bd4-8dc0-007df6ee3748',
                },
                bank_name: { type: 'string', example: 'Bank BRI' },
                account_number: { type: 'string', example: '96748638' },
                account_name: { type: 'string', example: 'Vel' },
                service_charge: { type: 'number', example: 1500 },
                handling_fee: { type: 'number', example: 3500 },
                bank_images: { type: 'string', example: null },
                bank_category_id: {
                  type: 'string',
                  example: '457beffd-b77c-4052-9ff7-06c74bde2815',
                },
              },
            },
            user: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  example: '1f4b0c0e-f297-45a7-8854-fccd7fddc5c4',
                },
                email: { type: 'string', example: 'taztaz@gmail.com' },
                password: {
                  type: 'string',
                  example:
                    '$2b$10$LVX3DrZTCX0g4B46F21qGull3Lxs.OL1vIE6cAHGGqPmbGl7EigpG',
                },
                role_id: {
                  type: 'string',
                  example: 'd789b7fd-b790-449b-b0cd-201294468ce2',
                },
                verified: { type: 'number', example: 1 },
                created_at: {
                  type: 'string',
                  example: '2024-07-11T05:54:23.483Z',
                },
                updated_at: {
                  type: 'string',
                  example: '2024-07-11T05:54:23.483Z',
                },
                profile: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'string',
                      example: '9ee5144b-54aa-4941-8ba6-f46c11a1e35d',
                    },
                    fullname: { type: 'string', example: 'Admin' },
                    phone_number: { type: 'string', example: '1234567894' },
                    profil_image: {
                      type: 'string',
                      example:
                        'https://api.dicebear.com/8.x/notionists/svg?seed=Admin',
                    },
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
                    user_id: {
                      type: 'string',
                      example: '1f4b0c0e-f297-45a7-8854-fccd7fddc5c4',
                    },
                    city_id: { type: 'string', example: null },
                    neighborhood_no: { type: 'string', example: null },
                    citizen_no: { type: 'string', example: null },
                    area_code: { type: 'string', example: null },
                    responsibleForCosts: { type: 'string', example: null },
                    city: { type: 'string', example: null },
                    user: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'string',
                          example: '1f4b0c0e-f297-45a7-8854-fccd7fddc5c4',
                        },
                        email: { type: 'string', example: 'taztaz@gmail.com' },
                        password: {
                          type: 'string',
                          example:
                            '$2b$10$LVX3DrZTCX0g4B46F21qGull3Lxs.OL1vIE6cAHGGqPmbGl7EigpG',
                        },
                        role_id: {
                          type: 'string',
                          example: 'd789b7fd-b790-449b-b0cd-201294468ce2',
                        },
                        verified: { type: 'number', example: 1 },
                        created_at: {
                          type: 'string',
                          example: '2024-07-11T05:54:23.483Z',
                        },
                        updated_at: {
                          type: 'string',
                          example: '2024-07-11T05:54:23.483Z',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  })
  async deleteRedeem(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const authorizationHeader = req.headers['authorization'];

      if (!authorizationHeader) {
        return res
          .status(400)
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
        return res
          .status(400)
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

      const deletedata = await this.lastRedeemService.deleteRedeem(token, id);

      if (deletedata.status) {
        return res
          .status(200)
          .json(
            format_json(
              200,
              true,
              null,
              null,
              deletedata.message,
              deletedata.data,
            ),
          );
      } else {
        return res
          .status(400)
          .json(format_json(400, false, null, null, deletedata.message, null));
      }
    } catch (error) {
      return res
        .status(400)
        .json(
          format_json(400, false, true, null, 'Server Error ' + error, error),
        );
    }
  }
}
