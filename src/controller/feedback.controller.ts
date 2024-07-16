import {
    Controller,
    Get,
    Post,
    UseGuards,
    Req,
    Res,
    HttpStatus,
    Body,
    UsePipes
  } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { format_json } from 'src/env';
import { Request, Response } from 'express';
import { FeedbackDTO } from 'src/dto/feedback.dto';
import { FeedbackService } from 'src/service/feedback.service';
import { CustomValidationPipe } from 'src/custom-validation.pipe';
import { RolesGuard } from 'src/middleware/role.guard';
import { Roles } from 'src/middleware/role.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Feedback')
@Controller('api')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Get('feedback')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
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
        message: { type: 'string', example: 'Success' },
        data: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '32b174fe-54dc-4cb6-b2b3-1ce90c7bbeee' },
            user_id: { type: 'string', example: '60a23769-2e28-416f-a028-22af012bfb57' },
            content: { type: 'string', example: 'Pangil saya ilham brosis' },
            user: {
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
                city_id: { type: 'string', example: null },
                neighborhood_no: { type: 'string', example: null },
                citizen_no: { type: 'string', example: null },
                area_code: { type: 'string', example: null },
                responsibleForCosts: { type: 'string', example: null }
              }
            }
          }
        }
      }
    }
  })
  async find(@Res() res: Response, @Req() req: Request) {
    try {
      const authorizationHeader = req.headers['authorization'];

      if (!authorizationHeader) {
        console.log('Authorization header is missing');
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
        console.log('Bearer token is missing');
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


      const getdata = await this.feedbackService.getdata(token);

      if (getdata.status) {
        return res
          .status(HttpStatus.OK)
          .json(
            format_json(200, true, null, null, getdata.message, getdata.data),
          );
      } else {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json(format_json(400, false, null, null, getdata.message, getdata.data));
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

  @Post('feedback')
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
        message: { type: 'string', example: 'Success' },
        data: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '32b174fe-54dc-4cb6-b2b3-1ce90c7bbeee' },
            user_id: { type: 'string', example: '60a23769-2e28-416f-a028-22af012bfb57' },
            content: { type: 'string', example: 'Pangil saya ilham brosis' },
            user: {
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
                city_id: { type: 'string', example: null },
                neighborhood_no: { type: 'string', example: null },
                citizen_no: { type: 'string', example: null },
                area_code: { type: 'string', example: null },
                responsibleForCosts: { type: 'string', example: null }
              }
            }
          }
        }
      }
    }
  })
  async create(
    @Body() feedbackDto: FeedbackDTO,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    try {
      const authorizationHeader = req.headers['authorization'];

      if (!authorizationHeader) {
        console.log('Authorization header is missing');
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
        console.log('Bearer token is missing');
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

      const create = await this.feedbackService.create(token, feedbackDto);

      if (create.status) {
        return res
          .status(HttpStatus.OK)
          .json(
            format_json(200, true, null, null, create.message, create.data),
          );
      } else {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json(format_json(400, false, null, null, create.message, create.data));
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
}
