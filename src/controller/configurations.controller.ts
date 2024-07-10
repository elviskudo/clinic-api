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
  @ApiResponse({ status: 200, description: 'Success' })
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
  @ApiResponse({ status: 200, description: 'Success' })
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
