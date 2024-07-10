import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, Res, UseGuards, UsePipes } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { approvaltokenDTO } from 'src/dto/appointment/approval-token.dto';
import { SchedulesDTO } from 'src/dto/appointment/schedule.dto';
import { SchedulesUpdateDTO } from 'src/dto/appointment/scheduleupdate.dto';
import { setTimeDTO } from 'src/dto/appointment/set-time.dto';
import { format_json } from 'src/env';
import { SchedulesService } from 'src/service/appointment/schedules.service';
import { Response } from 'express';
import { Roles } from 'src/middleware/role.decorator';
import { CustomValidationPipe } from 'src/custom-validation.pipe';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/middleware/role.guard';

@ApiTags('Schedules')
@Controller('api')
export class ScheduleController {
  constructor(private readonly SchedulesServices: SchedulesService) {}

@Get('schedules/get-approval-token')
 @UseGuards(AuthGuard('jwt'), RolesGuard)
 @ApiOperation({ summary: 'Get approval token' })
  @ApiResponse({ status: 200, description: 'Success' })
  async getapprovaltoken(@Res() res: Response,@Req() req: Request) {
    try {
      const authorizationHeader = req.headers['authorization'];

      if (!authorizationHeader) {
        return res
        .status(400)
        .json(format_json(
          400,
          false,
          null,
          null,
          'Authorization header is missing',
          null,
        ));
      }

      const token = authorizationHeader.split(' ')[1];

      if (!token) {
        return res
        .status(400)
        .json(format_json(400,false, null, null, 'Bearer token is missing', null));
      }

      const gettallRecords = await this.SchedulesServices.getToken(token);

      if (gettallRecords.status) {
        return res
        .status(201)
        .json(format_json(200,true, null, null, gettallRecords.message, gettallRecords.data));
      } else {
        return res
        .status(400)
        .json(format_json(400,false, null, null, gettallRecords.message, gettallRecords.data));
      }
    } catch (error) {
      return res
        .status(400)
        .json(format_json(400,false, true, null, 'Server Error '+error, error));
    }
  }

  @Post('schedules/approval-token/:code')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UsePipes(CustomValidationPipe)
  @ApiOperation({ summary: 'approval token' })
  @ApiResponse({ status: 200, description: 'Success' })
  async aspprovaltoken(@Res() res: Response,@Body() approvaltokenDTO: approvaltokenDTO,@Req() req: Request) {
    try {
      const authorizationHeader = req.headers['authorization'];

      if (!authorizationHeader) {
        return res
        .status(400)
        .json(format_json(
          400,
          false,
          null,
          null,
          'Authorization header is missing',
          null,
        ));
      }

      const token = authorizationHeader.split(' ')[1];

      if (!token) {
        return res
        .status(400)
        .json(format_json(400,false, null, null, 'Bearer token is missing', null));
      }

      const { code, approval } = approvaltokenDTO;

      const Create = {
        code: code,
        approval: approval
    };

      const createdata = await this.SchedulesServices.ApprovalToken(token,Create);

      if (createdata.status) {
        return res
        .status(201)
        .json(format_json(200,true, null, null, createdata.message, createdata.data));
      } else {
        return res
        .status(400)
        .json(format_json(400,false, null, null, createdata.message, null));
      }
    } catch (error) {
      return res
        .status(400)
        .json(format_json(400,false, true, null, 'Server Error '+error, error));
    }
  }

  @Post('schedules/set-time')
 @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('doctor')
  @UsePipes(CustomValidationPipe)
  @ApiOperation({ summary: 'Set time' })
  @ApiResponse({ status: 200, description: 'Success' })
  async SetTime(@Res() res: Response,@Body() setTimeDTO: setTimeDTO,@Req() req: Request) {
    try {
      const authorizationHeader = req.headers['authorization'];

      if (!authorizationHeader) {
        return res
        .status(400)
        .json(format_json(
          400,
          false,
          null,
          null,
          'Authorization header is missing',
          null,
        ));
      }

      const token = authorizationHeader.split(' ')[1];

      if (!token) {
        return res
        .status(400)
        .json(format_json(400,false, null, null, 'Bearer token is missing', null));
      }

      const { doctor_id, poly_id, clinic_id, date, time } = setTimeDTO;

      const Create = {
        doctor_id: doctor_id,
        poly_id: poly_id,
        clinic_id: clinic_id,
        date: date,
        time: time
    };

      const createdata = await this.SchedulesServices.SetTime(token,Create);

      if (createdata.status) {
        return res
        .status(201)
        .json(format_json(200,true, null, null, createdata.message, createdata.data));
      } else {
        return res
        .status(400)
        .json(format_json(400,false, null, null, createdata.message, null));
      }
    } catch (error) {
      return res
        .status(400)
        .json(format_json(400,false, true, null, 'Server Error '+error, error));
    }
  }
  

  @Post('schedules')
 @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('doctor')
  @UsePipes(CustomValidationPipe)
  @ApiOperation({ summary: 'Create schdules doctor' })
  @ApiResponse({ status: 200, description: 'Success' })
  async CreateSchedule(@Res() res: Response,@Body() scheduleDTO: SchedulesDTO,@Req() req: Request) {
    try {
      const authorizationHeader = req.headers['authorization'];

      if (!authorizationHeader) {
        return res
        .status(400)
        .json(format_json(
          400,
          false,
          null,
          null,
          'Authorization header is missing',
          null,
        ));
      }

      const token = authorizationHeader.split(' ')[1];

      if (!token) {
        return res
        .status(400)
        .json(format_json(400,false, null, null, 'Bearer token is missing', null));
      }

      const { doctor_id, clinic_name, poly_name, date, time } = scheduleDTO;

      const Schedules = { doctor_id, clinic_name,poly_name,date,time,
    };

      const createdata = await this.SchedulesServices.Create(token,Schedules);

      if (createdata.status) {
        return res
        .status(201)
        .json(format_json(200,true, null, null, createdata.message, createdata.data));
      } else {
        return res
        .status(400)
        .json(format_json(400,false, null, null, createdata.message, null));
      }
    } catch (error) {
      return res
        .status(400)
        .json(format_json(400,false, true, null, 'Server Error '+error, error));
    }
  }

  @Put('schedules/:id')
 @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('doctor')
  @UsePipes(CustomValidationPipe)
  @ApiOperation({ summary: 'update schedules doctor' })
  @ApiResponse({ status: 200, description: 'Success' })
  async UpdateSchedule(@Res() res: Response,@Param('id') id: string, @Body() scheduleDTO: SchedulesUpdateDTO,@Req() req: Request) {
    try {
      const authorizationHeader = req.headers['authorization'];

      if (!authorizationHeader) {
        return res
        .status(400)
        .json(format_json(
          400,
          false,
          null,
          null,
          'Authorization header is missing',
          null,
        ));
      }

      if(!id) {
        return res
        .status(400)
        .json(format_json(400,false, null, null, 'Id Harus di isi', null));
      }

      const token = authorizationHeader.split(' ')[1];

      if (!token) {
        return res
        .status(400)
        .json(format_json(400,false, null, null, 'Bearer token is missing', null));
      }

      const { date, time } = scheduleDTO;

      const Schedules = {
        date: date,
        time: time,
    };

      const createdata = await this.SchedulesServices.Update(token,Schedules, id);

      if (createdata.status) {
        return res
        .status(201)
        .json(format_json(200,true, null, null, createdata.message, createdata.data));
      } else {
        return res
        .status(400)
        .json(format_json(400,false, null, null, createdata.message, null));
      }
    } catch (error) {
      return res
        .status(400)
        .json(format_json(400,false, true, null, 'Server Error '+error, error));
    }
  }

  @Get('schedules/:doctor_id?/:date?')
 @UseGuards(AuthGuard('jwt'), RolesGuard)
 @ApiOperation({ summary: 'Get schedules' })
  @ApiResponse({ status: 200, description: 'Success' })
  async GetSchedule(@Res() res: Response, @Req() req: Request, @Param('doctor_id') doctor_id: string, @Param('date') date: string) {
    try {
      const authorizationHeader = req.headers['authorization'];

      if (!authorizationHeader) {
        return res
        .status(400)
        .json(format_json(
          400,
          false,
          null,
          null,
          'Authorization header is missing',
          null,
        ));
      }

      const token = authorizationHeader.split(' ')[1];

      if (!token) {
        return res
        .status(400)
        .json(format_json(400, false, null, null, 'Bearer token is missing', null));
      }

      const doctorId = doctor_id ? doctor_id : null;
      const parsedDate = date ? new Date(date) : null;

      const gettallRecords = await this.SchedulesServices.getAll(token, doctorId, parsedDate);

      if (gettallRecords.status) {
        return res
        .status(201)
        .json(format_json(200, true, null, null, gettallRecords.message, gettallRecords.data));
      } else {
        return res
        .status(400)
        .json(format_json(400, false, null, null, gettallRecords.message, gettallRecords.data));
      }
    } catch (error) {
      return res
        .status(400)
        .json(format_json(400, false, true, null, 'Server Error '+error, error));
    }
  }
}
