import { Controller, Patch, Body, Req, UseGuards, UsePipes, Post, Res, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CustomValidationPipe } from 'src/custom-validation.pipe';
import { format_json } from 'src/env';
import { ProfileConfigurationService } from 'src/service/profile_config/profile.config.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

@ApiTags('Profile configuration')
@Controller('api/settings')
@UseGuards(AuthGuard('jwt'))
export class SettingsController {
  constructor(
    private readonly profileConfigService: ProfileConfigurationService,
  ) {}

  @Post('location')
  @UsePipes(CustomValidationPipe)
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'location update' })
 @ApiResponse({
  status: 200,
  description: 'Success Update',
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 200 },
      success: { type: 'boolean', example: true },
      errors: { type: 'object', example: null },
      meta: { type: 'object', example: null },
      message: { type: 'string', example: 'Success Update' },
      data: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'ba82e17e-fbb4-43c3-8ba1-0535d18f63d3' },
          isLocation: { type: 'boolean', example: true },
          isPushNotification: { type: 'boolean', example: true },
          isEmailNotification: { type: 'boolean', example: true },
          user_id: { type: 'string', example: '166226f6-05fb-4684-9224-835f6e950645' },
          user: {
            type: 'object',
            properties: {
              id: { type: 'string', example: '166226f6-05fb-4684-9224-835f6e950645' },
              email: { type: 'string', example: 'taztaz@gmail.com' },
              password: { type: 'string', example: '$2b$10$42773pdci5ackZSI.Sv/Ye2VePObL9E4XVFZKKlqCF89Fk8NV1x7C' },
              role_id: { type: 'string', example: 'a7b79de4-c164-4f95-bcba-6ef1424d64ac' },
              verifed: { type: 'number', example: 1 },
              created_at: { type: 'string', example: '2024-07-16T11:46:02.782Z' },
              updated_at: { type: 'string', example: '2024-07-16T11:46:02.782Z' }
            }
          }
        }
      }
    }
  }
})

  async updateLocationSetting(
    @Body('isLocation') isLocation: boolean,
    @Req() req: Request,
    @Res() res: Response,
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


      const updatedConfig = await this.profileConfigService.update(token, {
        isLocation,
      });

      return res
      .status(200)
      .json(
        format_json(200, true, null, null, 'Success Update', updatedConfig),
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

  @Post('push-notification')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'notification update' })
 @ApiResponse({
  status: 200,
  description: 'Success Update',
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 200 },
      success: { type: 'boolean', example: true },
      errors: { type: 'object', example: null },
      meta: { type: 'object', example: null },
      message: { type: 'string', example: 'Success Update' },
      data: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'ba82e17e-fbb4-43c3-8ba1-0535d18f63d3' },
          isLocation: { type: 'boolean', example: true },
          isPushNotification: { type: 'boolean', example: true },
          isEmailNotification: { type: 'boolean', example: true },
          user_id: { type: 'string', example: '166226f6-05fb-4684-9224-835f6e950645' },
          user: {
            type: 'object',
            properties: {
              id: { type: 'string', example: '166226f6-05fb-4684-9224-835f6e950645' },
              email: { type: 'string', example: 'taztaz@gmail.com' },
              password: { type: 'string', example: '$2b$10$42773pdci5ackZSI.Sv/Ye2VePObL9E4XVFZKKlqCF89Fk8NV1x7C' },
              role_id: { type: 'string', example: 'a7b79de4-c164-4f95-bcba-6ef1424d64ac' },
              verifed: { type: 'number', example: 1 },
              created_at: { type: 'string', example: '2024-07-16T11:46:02.782Z' },
              updated_at: { type: 'string', example: '2024-07-16T11:46:02.782Z' }
            }
          }
        }
      }
    }
  }
})

  async updatePushNotificationSetting(
    @Body('isPushNotification') isPushNotification: boolean,
    @Req() req: Request,
    @Res() res: Response,
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


      const updatedConfig = await this.profileConfigService.update(token, {
        isPushNotification,
      });

      return res
      .status(200)
      .json(
        format_json(200, true, null, null, 'Success Update', updatedConfig),
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

  @Post('email-notification')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'email notification update' })
 @ApiResponse({
  status: 200,
  description: 'Success Update',
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 200 },
      success: { type: 'boolean', example: true },
      errors: { type: 'object', example: null },
      meta: { type: 'object', example: null },
      message: { type: 'string', example: 'Success Update' },
      data: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'ba82e17e-fbb4-43c3-8ba1-0535d18f63d3' },
          isLocation: { type: 'boolean', example: true },
          isPushNotification: { type: 'boolean', example: true },
          isEmailNotification: { type: 'boolean', example: true },
          user_id: { type: 'string', example: '166226f6-05fb-4684-9224-835f6e950645' },
          user: {
            type: 'object',
            properties: {
              id: { type: 'string', example: '166226f6-05fb-4684-9224-835f6e950645' },
              email: { type: 'string', example: 'taztaz@gmail.com' },
              password: { type: 'string', example: '$2b$10$42773pdci5ackZSI.Sv/Ye2VePObL9E4XVFZKKlqCF89Fk8NV1x7C' },
              role_id: { type: 'string', example: 'a7b79de4-c164-4f95-bcba-6ef1424d64ac' },
              verifed: { type: 'number', example: 1 },
              created_at: { type: 'string', example: '2024-07-16T11:46:02.782Z' },
              updated_at: { type: 'string', example: '2024-07-16T11:46:02.782Z' }
            }
          }
        }
      }
    }
  }
})

  async updateEmailNotificationSetting(
    @Body('isEmailNotification') isEmailNotification: boolean,
    @Req() req: Request,
    @Res() res: Response,
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


      const updatedConfig = await this.profileConfigService.update(token, {
        isEmailNotification,
      });

      return res
      .status(200)
      .json(
        format_json(200, true, null, null, 'Success Update', updatedConfig),
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
