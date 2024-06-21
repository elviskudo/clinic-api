import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { approvaltokenDTO } from 'src/dto/appointment/approval-token.dto';
import { SchedulesDTO } from 'src/dto/appointment/schedule.dto';
import { SchedulesUpdateDTO } from 'src/dto/appointment/scheduleupdate.dto';
import { setTimeDTO } from 'src/dto/appointment/set-time.dto';
import { ScheduleDto } from 'src/dto/schedule.dto';
import { format_json } from 'src/env';
import { SchedulesService } from 'src/service/appointment/schedules.service';
import { Response } from 'express';


@Controller('api')
export class LastRedeemController {
  constructor(private readonly SchedulesServices: SchedulesService) {}

  @Get('schedules/:doctor_id/:date')
  @UseGuards(AuthGuard('jwt'))
  async GetSchedule(@Req() req: Request,@Param('doctor_id', ParseIntPipe) doctor_id: number,@Param('date', ParseIntPipe) date: Date) {
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

      const gettallRecords = await this.SchedulesServices.getAll(token,doctor_id,date);

      if (gettallRecords.status) {
        return format_json(200,true, null, null, gettallRecords.message, {
          redeem: gettallRecords.data,
        });
      } else {
        return format_json(400,false, null, null, gettallRecords.message, null);
      }
    } catch (error) {
      return format_json(400,false, true, null, 'Server Error', error);
    }
  }

  @Get('schedules/get-approval-token')
  @UseGuards(AuthGuard('jwt'))
  async getapprovaltoken(@Req() req: Request) {
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

      const gettallRecords = await this.SchedulesServices.getToken(token);

      if (gettallRecords.status) {
        return format_json(200,true, null, null, gettallRecords.message, {
          redeem: gettallRecords.data,
        });
      } else {
        return format_json(400,false, null, null, gettallRecords.message, null);
      }
    } catch (error) {
      return format_json(400,false, true, null, 'Server Error', error);
    }
  }

  @Post('schedules/approval-token/:code')
  @UseGuards(AuthGuard('jwt'))
  async aspprovaltoken(@Param('code') code: string,@Body() approvaltokenDTO: approvaltokenDTO,@Req() req: Request) {
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

      const { doctor_id, approval } = approvaltokenDTO;

      const Create = {
        doctor_id: doctor_id,
        approval: approval
    };

      const createdata = await this.SchedulesServices.ApprovalToken(token,Create,code);

      if (createdata.status) {
        return format_json(200,true, null, null, createdata.message, {
          redeem: createdata.data,
        });
      } else {
        return format_json(400,false, null, null, createdata.message, null);
      }
    } catch (error) {
      return format_json(400,false, true, null, 'Server Error', error);
    }
  }

  @Post('schedules/set-time')
  @UseGuards(AuthGuard('jwt'))
  async SetTime(@Body() setTimeDTO: setTimeDTO,@Req() req: Request) {
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

      const { doctor_id, date, time } = setTimeDTO;

      const Create = {
        doctor_id: doctor_id,
        date: date,
        time: time
    };

      const createdata = await this.SchedulesServices.SetTime(token,Create);

      if (createdata.status) {
        return format_json(200,true, null, null, createdata.message, {
          redeem: createdata.data,
        });
      } else {
        return format_json(400,false, null, null, createdata.message, null);
      }
    } catch (error) {
      return format_json(400,false, true, null, 'Server Error', error);
    }
  }
  

  @Post('schedules')
  @UseGuards(AuthGuard('jwt'))
  async CreateSchedule(@Body() scheduleDTO: SchedulesDTO,@Req() req: Request) {
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

      const { doctor_id, clinic_name, poly_name, date, time } = scheduleDTO;

      const Schedules = {
        doctor_id: doctor_id,
        date: date,
        time: time,
    };

      const createdata = await this.SchedulesServices.Create(token,Schedules,clinic_name,poly_name);

      if (createdata.status) {
        return format_json(200,true, null, null, createdata.message, {
          redeem: createdata.data,
        });
      } else {
        return format_json(400,false, null, null, createdata.message, null);
      }
    } catch (error) {
      return format_json(400,false, true, null, 'Server Error', error);
    }
  }

  @Put('schedules/:id')
  @UseGuards(AuthGuard('jwt'))
  async UpdateSchedule(@Param('id') id: string, @Body() scheduleDTO: SchedulesUpdateDTO,@Req() req: Request) {
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

      if(!id) {
        return format_json(400,false, null, null, 'Id Harus di isi', null);
      }

      const token = authorizationHeader.split(' ')[1];

      if (!token) {
        return format_json(400,false, null, null, 'Bearer token is missing', null);
      }

      const { date, time } = scheduleDTO;

      const Schedules = {
        date: date,
        time: time,
    };

      const createdata = await this.SchedulesServices.Update(token,Schedules);

      if (createdata.status) {
        return format_json(200,true, null, null, createdata.message, {
          redeem: createdata.data,
        });
      } else {
        return format_json(400,false, null, null, createdata.message, null);
      }
    } catch (error) {
      return format_json(400,false, true, null, 'Server Error', error);
    }
  }
}
