import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { LastRedeemService } from 'src/service/latest/last.redeem.service';
import { format_json } from 'src/env';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Last redeem')
@Controller('api/users')
export class LastRedeemController {
  constructor(private readonly lastRedeemService: LastRedeemService) {}

  @Get('last-redeem')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'get' })
  @ApiResponse({
    status: 200,
    description: 'Last redeem record retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: '9a119b08-40dc-40c8-a6bd-d17a382de33e' },
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
          example: 'b35c1d87-11e1-4bc6-b837-897a49fe6530',
        },
        user_id: {
          type: 'string',
          example: '166226f6-05fb-4684-9224-835f6e950645',
        },
        bank: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: 'b35c1d87-11e1-4bc6-b837-897a49fe6530',
            },
            bank_name: { type: 'string', example: 'Bank BRI' },
            account_number: { type: 'string', example: '96748638' },
            account_name: { type: 'string', example: 'Natskuy' },
            service_charge: { type: 'number', example: 1500 },
            handling_fee: { type: 'number', example: 3500 },
            bank_images: { type: 'string', example: null },
            bank_category_id: {
              type: 'string',
              example: 'e5ecb60d-9f58-4545-b365-12f61f27f270',
            },
          },
        },
        user: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: '166226f6-05fb-4684-9224-835f6e950645',
            },
            email: { type: 'string', example: 'taztaz@gmail.com' },
            password: {
              type: 'string',
              example:
                '$2b$10$42773pdci5ackZSI.Sv/Ye2VePObL9E4XVFZKKlqCF89Fk8NV1x7C',
            },
            role_id: {
              type: 'string',
              example: 'a7b79de4-c164-4f95-bcba-6ef1424d64ac',
            },
            verifed: { type: 'number', example: 1 },
            created_at: { type: 'string', example: '2024-07-16T11:46:02.782Z' },
            updated_at: { type: 'string', example: '2024-07-16T11:46:02.782Z' },
            profile: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  example: 'f1967871-e89a-434a-8754-06fea62575ba',
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
                  example: '166226f6-05fb-4684-9224-835f6e950645',
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
                      example: '166226f6-05fb-4684-9224-835f6e950645',
                    },
                    email: { type: 'string', example: 'taztaz@gmail.com' },
                    password: {
                      type: 'string',
                      example:
                        '$2b$10$42773pdci5ackZSI.Sv/Ye2VePObL9E4XVFZKKlqCF89Fk8NV1x7C',
                    },
                    role_id: {
                      type: 'string',
                      example: 'a7b79de4-c164-4f95-bcba-6ef1424d64ac',
                    },
                    verifed: { type: 'number', example: 1 },
                    created_at: {
                      type: 'string',
                      example: '2024-07-16T11:46:02.782Z',
                    },
                    updated_at: {
                      type: 'string',
                      example: '2024-07-16T11:46:02.782Z',
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
  async getLastRedeem(@Req() req: Request) {
    try {
      const authorizationHeader = req.headers['authorization'];

      if (!authorizationHeader) {
        return format_json(
          400,
          false,
          null,
          null,
          'Authorization header is missing',
          null,
        );
      }

      const token = authorizationHeader.split(' ')[1];

      if (!token) {
        return format_json(
          400,
          false,
          null,
          null,
          'Bearer token is missing',
          null,
        );
      }

      const getRedeemResult = await this.lastRedeemService.getLastRedeem(token);

      if (getRedeemResult.status) {
        return format_json(
          200,
          true,
          null,
          null,
          getRedeemResult.message,
          getRedeemResult.data,
        );
      } else {
        return format_json(
          400,
          false,
          null,
          null,
          getRedeemResult.message,
          getRedeemResult.data,
        );
      }
    } catch (error) {
      return format_json(
        400,
        false,
        true,
        null,
        'Server Error ' + error,
        error,
      );
    }
  }
}
