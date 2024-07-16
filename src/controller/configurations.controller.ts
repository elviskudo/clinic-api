import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CustomValidationPipe } from 'src/custom-validation.pipe';
import { configurationsDTO } from 'src/dto/configurations.dto';
import { format_json } from 'src/env';
import { RolesGuard } from 'src/middleware/role.guard';
import { configurationsService } from 'src/service/configurations.service';

@ApiTags('Configurations')
@Controller('api')
export class configurationsController {
  constructor(private readonly configurationsService: configurationsService) {}

  @Get('configurations')
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
            id: { type: 'string', example: '30059f5b-2493-4da9-9951-1bc828d37c3b' },
            application_name: { type: 'string', example: 'Clinic AI' },
            application_version: { type: 'string', example: '1.0.3' },
            application_content: { type: 'string', example: 'summary aplikasinya' },
            application_teams: { type: 'string', example: 'elvis sonatha as CEO, yara bramasta as lead developer, zainul firdaus as UIX, ilham maulana as API developer, …' },
            by_email: { type: 'string', example: 'email' },
            by_email_username: { type: 'string', example: 'username' },
            by_email_password: { type: 'string', example: 'pass' },
            to_email: { type: 'string', example: 'email' },
            by_whatsapp: { type: 'string', example: 'whatsapp' },
            by_whatsapp_secret: { type: 'string', example: 'secret' },
            by_telegram: { type: 'string', example: 'tele' },
            by_telegram_secret: { type: 'string', example: 'secret' }
          }
        }
      }
    }
  })
  async Get(@Req() req: Request) {
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

      const gettallRecords = await this.configurationsService.getdata(token);

      if (gettallRecords.status) {
        return format_json(
          200,
          true,
          null,
          null,
          gettallRecords.message,
          gettallRecords.data,
        );
      } else {
        return format_json(
          400,
          false,
          null,
          null,
          gettallRecords.message,
          null,
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

  @Post('configurations')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UsePipes(CustomValidationPipe)
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
            id: { type: 'string', example: '30059f5b-2493-4da9-9951-1bc828d37c3b' },
            application_name: { type: 'string', example: 'Clinic AI' },
            application_version: { type: 'string', example: '1.0.3' },
            application_content: { type: 'string', example: 'summary aplikasinya' },
            application_teams: { type: 'string', example: 'elvis sonatha as CEO, yara bramasta as lead developer, zainul firdaus as UIX, ilham maulana as API developer, …' },
            by_email: { type: 'string', example: 'email' },
            by_email_username: { type: 'string', example: 'username' },
            by_email_password: { type: 'string', example: 'pass' },
            to_email: { type: 'string', example: 'email' },
            by_whatsapp: { type: 'string', example: 'whatsapp' },
            by_whatsapp_secret: { type: 'string', example: 'secret' },
            by_telegram: { type: 'string', example: 'tele' },
            by_telegram_secret: { type: 'string', example: 'secret' }
          }
        }
      }
    }
  })
  async update(@Req() req: Request, @Body() data: configurationsDTO) {
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

      const gettallRecords = await this.configurationsService.update(
        token,
        data,
      );

      if (gettallRecords.status) {
        return format_json(
          200,
          true,
          null,
          null,
          gettallRecords.message,
          gettallRecords.data,
        );
      } else {
        return format_json(
          400,
          false,
          null,
          null,
          gettallRecords.message,
          null,
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
