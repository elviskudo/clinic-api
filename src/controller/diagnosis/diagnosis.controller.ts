import {
  Controller,
  Get,
  Post,
  UseGuards,
  Req,
  Res,
  HttpStatus,
  Body,
  Put,
  Param,
  Delete,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { format_json } from 'src/env';
import { Request, Response } from 'express';
import { DiagnosisDTO } from 'src/dto/diagnosis.dto';
import { DiagnosisService } from 'src/service/diagnosis/diagnosis.service';
import { CustomValidationPipe } from 'src/custom-validation.pipe';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/middleware/role.decorator';
import { RolesGuard } from 'src/middleware/role.guard';

@ApiTags('Diagnosis')
@Controller('api')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class DiagnosisController {
  constructor(private readonly diagnosisService: DiagnosisService) {}

  @Get('diagnosis')
  @Roles('admin', 'manager', 'operator')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOperation({ summary: 'Get' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          user_id: {
            type: 'string',
            example: 'f1967871-e89a-434a-8754-06fea62575ba',
          },
          user: {
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
              city_id: { type: 'string', example: null },
              neighborhood_no: { type: 'string', example: null },
              citizen_no: { type: 'string', example: null },
              area_code: { type: 'string', example: null },
              responsibleForCosts: { type: 'string', example: null },
            },
          },
          deaseas_name: { type: 'string', example: 'Muntah' },
        },
      },
    },
  })
  async find(@Res() res: Response, @Req() req: Request) {
    try {
      const authorizationHeader = req.headers['authorization'];

      if (!authorizationHeader) {
        return res
          .status(HttpStatus.BAD_REQUEST)
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
          .status(HttpStatus.BAD_REQUEST)
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

      const getdata = await this.diagnosisService.getdata(token);

      if (getdata.status) {
        return res
          .status(HttpStatus.OK)
          .json(
            format_json(200, true, null, null, getdata.message, getdata.data),
          );
      } else {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json(format_json(400, false, null, null, getdata.message, null));
      }
    } catch (error) {
      console.error('Server Error:', error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(
          format_json(500, false, true, null, 'Server Error ' + error, error),
        );
    }
  }

  @Post('diagnosis')
  @Roles('admin', 'manager', 'operator')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UsePipes(CustomValidationPipe)
  @ApiOperation({ summary: 'Create' })
  @ApiResponse({
    status: 201,
    description: 'Created',
    schema: {
      type: 'object',
      properties: {
        user_id: {
          type: 'string',
          example: 'f1967871-e89a-434a-8754-06fea62575ba',
        },
        user: {
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
              example: 'https://api.dicebear.com/8.x/notionists/svg?seed=Admin',
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
            city_id: { type: 'string', example: null },
            neighborhood_no: { type: 'string', example: null },
            citizen_no: { type: 'string', example: null },
            area_code: { type: 'string', example: null },
            responsibleForCosts: { type: 'string', example: null },
          },
        },
        deaseas_name: { type: 'string', example: 'Muntah' },
      },
    },
  })
  async create(
    @Body() diagnosisDTO: DiagnosisDTO,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    try {
      const authorizationHeader = req.headers['authorization'];

      if (!authorizationHeader) {
        return res
          .status(HttpStatus.BAD_REQUEST)
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
          .status(HttpStatus.BAD_REQUEST)
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

      const create = await this.diagnosisService.create(token, diagnosisDTO);

      if (create.status) {
        return res
          .status(HttpStatus.OK)
          .json(
            format_json(200, true, null, null, create.message, create.data),
          );
      } else {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json(format_json(400, false, null, null, create.message, null));
      }
    } catch (error) {
      console.error('Server Error:', error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(
          format_json(500, false, true, null, 'Server Error ' + error, error),
        );
    }
  }

  @Put('diagnosis/:id')
  @Roles('admin', 'manager', 'operator')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UsePipes(CustomValidationPipe)
  @ApiOperation({ summary: 'Update' })
  @ApiResponse({
    status: 200,
    description: 'Updated',
    schema: {
      type: 'object',
      properties: {
        user_id: {
          type: 'string',
          example: 'f1967871-e89a-434a-8754-06fea62575ba',
        },
        user: {
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
              example: 'https://api.dicebear.com/8.x/notionists/svg?seed=Admin',
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
            city_id: { type: 'string', example: null },
            neighborhood_no: { type: 'string', example: null },
            citizen_no: { type: 'string', example: null },
            area_code: { type: 'string', example: null },
            responsibleForCosts: { type: 'string', example: null },
          },
        },
        deaseas_name: { type: 'string', example: 'Demam' },
      },
    },
  })
  async update(
    @Param('id') id: string,
    @Body() diagnosisDTO: DiagnosisDTO,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    try {
      const authorizationHeader = req.headers['authorization'];

      if (!authorizationHeader) {
        return res
          .status(HttpStatus.BAD_REQUEST)
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
          .status(HttpStatus.BAD_REQUEST)
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

      const update = await this.diagnosisService.update(
        token,
        id,
        diagnosisDTO,
      );

      if (update.status) {
        return res
          .status(HttpStatus.OK)
          .json(
            format_json(200, true, null, null, update.message, update.data),
          );
      } else {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json(format_json(400, false, null, null, update.message, null));
      }
    } catch (error) {
      console.error('Server Error:', error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(
          format_json(500, false, true, null, 'Server Error ' + error, error),
        );
    }
  }

  @Delete('diagnosis/:id')
  @Roles('admin', 'manager', 'operator')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOperation({ summary: 'Delete' })
  @ApiResponse({
    status: 204,
    description: 'Deleted',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: 204 },
        success: { type: 'boolean', example: true },
        errors: { type: 'object', example: null },
        meta: { type: 'object', example: null },
        message: { type: 'string', example: 'Diagnosis deleted successfully' },
        data: { type: 'object', example: null }, // Typically no data returned for delete
      },
    },
  })
  async deletepayment(
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

      const deletedata = await this.diagnosisService.delete(token, id);

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
