import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  HttpStatus,
  Res,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { format_json } from 'src/env';
import { Request, Response } from 'express';
import { DiagnosisDTO } from 'src/dto/diagnosis.dto';
import { DiagnosisService } from 'src/service/diagnosis/diagnosis.service';
import { Roles } from 'src/middleware/role.decorator';
import { RolesGuard } from 'src/middleware/role.guard';

@Controller('api')
@UseGuards(RolesGuard)
export class DiagnosisController {
  constructor(private readonly diagnosisService: DiagnosisService) {}

  @Get('diagnosis')
  @Roles('admin', 'manager', 'operator')
  @UseGuards(AuthGuard('jwt'))
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
          format_json(
            500,
            false,
            true,
            null,
            'Server Error ' + error.message,
            error,
          ),
        );
    }
  }

  @Post('diagnosis')
  @Roles('admin', 'manager', 'operator')
  @UseGuards(AuthGuard('jwt'))
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
          format_json(
            500,
            false,
            true,
            null,
            'Server Error ' + error.message,
            error,
          ),
        );
    }
  }

  @Put('diagnosis/:id')
  @Roles('admin', 'manager', 'operator')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id') id: number,
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
          format_json(
            500,
            false,
            true,
            null,
            'Server Error ' + error.message,
            error,
          ),
        );
    }
  }

  @Delete('diagnosis/:id')
  @Roles('admin', 'manager', 'operator')
  @UseGuards(AuthGuard('jwt'))
  async deletepayment(
    @Param('id') id: number,
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
          format_json(
            400,
            false,
            true,
            null,
            'Server Error ' + error.message,
            error,
          ),
        );
    }
  }
}
