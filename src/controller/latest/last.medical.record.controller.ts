import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { format_json } from 'src/env';
import { LastMedicalRecordService } from 'src/service/latest/last.medical.record.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Last medical record')
@Controller('api/users')
export class LastMedicalRecordController {
  constructor(
    private readonly lastMedicalRecordService: LastMedicalRecordService,
  ) {}

  @Get('last-medical-record')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get' })
  @ApiResponse({ status: 200, description: 'Success' })
  async getLastMedicalRecord(@Req() req: Request, @Res() res: Response) {
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

      const lastMedicalRecord =
        await this.lastMedicalRecordService.getLastMedicalRecord(token);

      if (lastMedicalRecord.status) {
        return res.status(200).json(
          format_json(200, true, null, null, lastMedicalRecord.message, lastMedicalRecord.data),
        );
      } else {
        return res
          .status(400)
          .json(
            format_json(
              400,
              false,
              null,
              null,
              lastMedicalRecord.message,
              lastMedicalRecord.data,
            ),
          );
      }
    } catch (error) {
      return res
        .status(500)
        .json(format_json(500, false, true, null, 'Server Error '+error, error));
    }
  }
}
