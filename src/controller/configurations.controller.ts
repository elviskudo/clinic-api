import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { configurationsDTO } from 'src/dto/configurations.dto';
import { format_json } from 'src/env';
import { configurationsService } from 'src/service/configurations.service';

@Controller('api')
export class configurationsController {
  constructor(private readonly configurationsService: configurationsService) {}

  @Get('configurations')
  @UseGuards(AuthGuard('jwt'))
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
        return format_json(400,false, null, null, 'Bearer token is missing', null);
      }

      const gettallRecords = await this.configurationsService.getdata(token);

      if (gettallRecords.status) {
        return format_json(200,true, null, null, gettallRecords.message, gettallRecords.data);
      } else {
        return format_json(400,false, null, null, gettallRecords.message, null);
      }
    } catch (error) {
      return format_json(400,false, true, null, 'Server Error '+error.message, error);
    }
  }

  @Post('configurations')
  @UseGuards(AuthGuard('jwt'))
  async update(@Req() req: Request,@Body() data: configurationsDTO) {
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
        return format_json(400,false, null, null, 'Bearer token is missing', null);
      }

      const gettallRecords = await this.configurationsService.update(token,data);

      if (gettallRecords.status) {
        return format_json(200,true, null, null, gettallRecords.message, gettallRecords.data);
      } else {
        return format_json(400,false, null, null, gettallRecords.message, null);
      }
    } catch (error) {
      return format_json(400,false, true, null, 'Server Error '+error.message, error);
    }
  }
}
