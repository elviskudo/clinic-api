import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { format_json } from 'src/env';
import { AppointmentService } from 'src/service/appointment/appointment.service';

@Controller('api')
export class LastRedeemController {
  constructor(private readonly AppointmentServices: AppointmentService) {}

  @Get('users/appointments/:user_id')
  @UseGuards(AuthGuard('jwt'))
  async GetSchedule(@Req() req: Request,@Param('user_id', ParseIntPipe) user_id: number) {
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

      const gettallRecords = await this.AppointmentServices.getAll(token,user_id);

      if (gettallRecords.status) {
        return format_json(200,true, null, null, gettallRecords.message, {
          redeem: gettallRecords.data,
        });
      } else {
        return format_json(400,false, null, null, gettallRecords.message, null);
      }
    } catch (error) {
      return format_json(400,false, true, null, 'Server Error '+error.message, error);
    }
  }
}
