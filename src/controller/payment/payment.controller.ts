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
import { format_json } from 'src/env';
import { PaymentService } from 'src/service/payment/payment.service';
import { paymentDTO } from 'src/dto/payment/payment.dto';
import { CustomValidationPipe } from 'src/custom-validation.pipe';
import { RolesGuard } from 'src/middleware/role.guard';
import { Roles } from 'src/middleware/role.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Payment')
@Controller('api/users')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get('payment')
  @Roles('admin', 'manager', 'operator')
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
        message: { type: 'string', example: 'Payments retrieved successfully' },
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                example: '2312bfe1-fd15-4499-bbf7-495fbc1832f9',
              },
              payment_name: { type: 'string', example: 'Pay' },
              redeem_id: {
                type: 'string',
                example: 'f899770a-41b8-4f5b-a169-6c93f29d34e5',
              },
              bank_id: {
                type: 'string',
                example: 'aadee9d3-6680-45de-b624-98a8ab03e1dc',
              },
              bank: {
                type: 'object',
                properties: {
                  id: {
                    type: 'string',
                    example: 'aadee9d3-6680-45de-b624-98a8ab03e1dc',
                  },
                  bank_name: { type: 'string', example: 'Bank BRI' },
                  account_number: { type: 'string', example: '96748638' },
                  account_name: { type: 'string', example: 'Natskuy' },
                  service_charge: { type: 'number', example: 1500 },
                  handling_fee: { type: 'number', example: 3500 },
                  bank_images: { type: 'string', example: null },
                  bank_category_id: {
                    type: 'string',
                    example: '6ede93a1-33cc-4909-9a00-fc08c34b8609',
                  },
                  bank_category: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string',
                        example: '6ede93a1-33cc-4909-9a00-fc08c34b8609',
                      },
                      category_name: { type: 'string', example: 'E-Wallet' },
                      description: {
                        type: 'string',
                        example: 'Accounts for E-Wallet',
                      },
                    },
                  },
                },
              },
              user_id: {
                type: 'string',
                example: '31ab3d21-f7ff-48b7-8953-a48c8298e819',
              },
              user: {
                type: 'object',
                properties: {
                  id: {
                    type: 'string',
                    example: '31ab3d21-f7ff-48b7-8953-a48c8298e819',
                  },
                  email: { type: 'string', example: 'taztaz@gmail.com' },
                  password: {
                    type: 'string',
                    example:
                      '$2b$10$dbJ2tjoyarF9usrOGwayy.wO10cu/WyXz11Wn2r4qEGSUyN0Dtutq',
                  },
                  role_id: {
                    type: 'string',
                    example: 'b8da868c-b946-4c7e-b18b-49520ee4e774',
                  },
                  verifed: { type: 'number', example: 1 },
                  created_at: {
                    type: 'string',
                    example: '2024-07-15T02:54:09.438Z',
                  },
                  updated_at: {
                    type: 'string',
                    example: '2024-07-15T02:54:09.438Z',
                  },
                  profile: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string',
                        example: '60a23769-2e28-416f-a028-22af012bfb57',
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
                        example: '31ab3d21-f7ff-48b7-8953-a48c8298e819',
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
                            example: '31ab3d21-f7ff-48b7-8953-a48c8298e819',
                          },
                          email: {
                            type: 'string',
                            example: 'taztaz@gmail.com',
                          },
                          password: {
                            type: 'string',
                            example:
                              '$2b$10$dbJ2tjoyarF9usrOGwayy.wO10cu/WyXz11Wn2r4qEGSUyN0Dtutq',
                          },
                          role_id: {
                            type: 'string',
                            example: 'b8da868c-b946-4c7e-b18b-49520ee4e774',
                          },
                          verifed: { type: 'number', example: 1 },
                          created_at: {
                            type: 'string',
                            example: '2024-07-15T02:54:09.438Z',
                          },
                          updated_at: {
                            type: 'string',
                            example: '2024-07-15T02:54:09.438Z',
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
    },
  })
  async getPayment(@Req() req: Request, @Res() res: Response) {
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

      const getdata = await this.paymentService.getdata(token);

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
            format_json(400, false, null, null, getdata.message, getdata.data),
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

  @Post('payment')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(CustomValidationPipe)
  @Roles('admin', 'manager', 'operator')
  @ApiOperation({ summary: 'Create' })
  @ApiResponse({
    status: 201,
    description: 'Success',
    schema: {
      properties: {
        id: {
          type: 'string',
          example: '2312bfe1-fd15-4499-bbf7-495fbc1832f9',
        },
        payment_name: { type: 'string', example: 'Pay' },
        redeem_id: {
          type: 'string',
          example: 'f899770a-41b8-4f5b-a169-6c93f29d34e5',
        },
        bank_id: {
          type: 'string',
          example: 'aadee9d3-6680-45de-b624-98a8ab03e1dc',
        },
        bank: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: 'aadee9d3-6680-45de-b624-98a8ab03e1dc',
            },
            bank_name: { type: 'string', example: 'Bank BRI' },
            account_number: { type: 'string', example: '96748638' },
            account_name: { type: 'string', example: 'Natskuy' },
            service_charge: { type: 'number', example: 1500 },
            handling_fee: { type: 'number', example: 3500 },
            bank_images: { type: 'string', example: null },
            bank_category_id: {
              type: 'string',
              example: '6ede93a1-33cc-4909-9a00-fc08c34b8609',
            },
            bank_category: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  example: '6ede93a1-33cc-4909-9a00-fc08c34b8609',
                },
                category_name: { type: 'string', example: 'E-Wallet' },
                description: {
                  type: 'string',
                  example: 'Accounts for E-Wallet',
                },
              },
            },
          },
        },
        user_id: {
          type: 'string',
          example: '31ab3d21-f7ff-48b7-8953-a48c8298e819',
        },
        user: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: '31ab3d21-f7ff-48b7-8953-a48c8298e819',
            },
            email: { type: 'string', example: 'taztaz@gmail.com' },
            password: {
              type: 'string',
              example:
                '$2b$10$dbJ2tjoyarF9usrOGwayy.wO10cu/WyXz11Wn2r4qEGSUyN0Dtutq',
            },
            role_id: {
              type: 'string',
              example: 'b8da868c-b946-4c7e-b18b-49520ee4e774',
            },
            verifed: { type: 'number', example: 1 },
            created_at: { type: 'string', example: '2024-07-15T02:54:09.438Z' },
            updated_at: { type: 'string', example: '2024-07-15T02:54:09.438Z' },
            profile: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  example: '60a23769-2e28-416f-a028-22af012bfb57',
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
                  example: '31ab3d21-f7ff-48b7-8953-a48c8298e819',
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
                      example: '31ab3d21-f7ff-48b7-8953-a48c8298e819',
                    },
                    email: { type: 'string', example: 'taztaz@gmail.com' },
                    password: {
                      type: 'string',
                      example:
                        '$2b$10$dbJ2tjoyarF9usrOGwayy.wO10cu/WyXz11Wn2r4qEGSUyN0Dtutq',
                    },
                    role_id: {
                      type: 'string',
                      example: 'b8da868c-b946-4c7e-b18b-49520ee4e774',
                    },
                    verifed: { type: 'number', example: 1 },
                    created_at: {
                      type: 'string',
                      example: '2024-07-15T02:54:09.438Z',
                    },
                    updated_at: {
                      type: 'string',
                      example: '2024-07-15T02:54:09.438Z',
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
  async createPayment(
    @Body() createDTO: paymentDTO,
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

      const create = await this.paymentService.createpayment(token, createDTO);

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

  @Put('payment/:id')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(CustomValidationPipe)
  @Put('payment/:id')
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
        message: { type: 'string', example: 'Payment updated successfully' },
        data: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: '2312bfe1-fd15-4499-bbf7-495fbc1832f9',
            },
            payment_name: { type: 'string', example: 'Updated Payment' },
            redeem_id: {
              type: 'string',
              example: 'f899770a-41b8-4f5b-a169-6c93f29d34e5',
            },
            bank_id: {
              type: 'string',
              example: 'aadee9d3-6680-45de-b624-98a8ab03e1dc',
            },
            bank: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  example: 'aadee9d3-6680-45de-b624-98a8ab03e1dc',
                },
                bank_name: { type: 'string', example: 'Bank BRI' },
                account_number: { type: 'string', example: '96748638' },
                account_name: { type: 'string', example: 'Natskuy' },
                service_charge: { type: 'number', example: 1500 },
                handling_fee: { type: 'number', example: 3500 },
                bank_images: { type: 'string', example: null },
                bank_category_id: {
                  type: 'string',
                  example: '6ede93a1-33cc-4909-9a00-fc08c34b8609',
                },
                bank_category: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'string',
                      example: '6ede93a1-33cc-4909-9a00-fc08c34b8609',
                    },
                    category_name: { type: 'string', example: 'E-Wallet' },
                    description: {
                      type: 'string',
                      example: 'Accounts for E-Wallet',
                    },
                  },
                },
              },
            },
            user_id: {
              type: 'string',
              example: '31ab3d21-f7ff-48b7-8953-a48c8298e819',
            },
            user: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  example: '31ab3d21-f7ff-48b7-8953-a48c8298e819',
                },
                email: { type: 'string', example: 'taztaz@gmail.com' },
                password: {
                  type: 'string',
                  example:
                    '$2b$10$dbJ2tjoyarF9usrOGwayy.wO10cu/WyXz11Wn2r4qEGSUyN0Dtutq',
                },
                role_id: {
                  type: 'string',
                  example: 'b8da868c-b946-4c7e-b18b-49520ee4e774',
                },
                verifed: { type: 'number', example: 1 },
                created_at: {
                  type: 'string',
                  example: '2024-07-15T02:54:09.438Z',
                },
                updated_at: {
                  type: 'string',
                  example: '2024-07-15T02:54:09.438Z',
                },
                profile: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'string',
                      example: '60a23769-2e28-416f-a028-22af012bfb57',
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
                      example: '31ab3d21-f7ff-48b7-8953-a48c8298e819',
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
                          example: '31ab3d21-f7ff-48b7-8953-a48c8298e819',
                        },
                        email: { type: 'string', example: 'taztaz@gmail.com' },
                        password: {
                          type: 'string',
                          example:
                            '$2b$10$dbJ2tjoyarF9usrOGwayy.wO10cu/WyXz11Wn2r4qEGSUyN0Dtutq',
                        },
                        role_id: {
                          type: 'string',
                          example: 'b8da868c-b946-4c7e-b18b-49520ee4e774',
                        },
                        verifed: { type: 'number', example: 1 },
                        created_at: {
                          type: 'string',
                          example: '2024-07-15T02:54:09.438Z',
                        },
                        updated_at: {
                          type: 'string',
                          example: '2024-07-15T02:54:09.438Z',
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
  async updatePayment(
    @Param('id') id: string,
    @Body() createDTO: paymentDTO,
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

      const update = await this.paymentService.update(token, createDTO, id);

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

  @Delete('payment/:id')
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
        message: { type: 'string', example: 'Payment deleted successfully' },
        data: null,
      },
    },
  })
  async deletePayment(
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

      const deleteData = await this.paymentService.delete(token, id);

      if (deleteData.status) {
        return res
          .status(200)
          .json(
            format_json(
              200,
              true,
              null,
              null,
              deleteData.message,
              deleteData.data,
            ),
          );
      } else {
        return res
          .status(400)
          .json(
            format_json(
              400,
              false,
              null,
              null,
              deleteData.message,
              deleteData.data,
            ),
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
}
