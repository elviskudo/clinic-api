import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Res,
  UseGuards,
  Req,
  UsePipes
} from '@nestjs/common';
import { Response, Request } from 'express';
import { format_json } from 'src/env';
import { SummaryDto } from 'src/dto/summary/summary.dto';
import { SummaryService } from 'src/service/summary/summary.service';
import { AuthGuard } from '@nestjs/passport';
import { UpdateSummaryDto } from 'src/dto/summary/update.summary.dto';
import { CustomValidationPipe } from 'src/custom-validation.pipe';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/middleware/role.guard';

@ApiTags('Appointments')
@Controller('api/users')
export class SummaryController {
  constructor(private readonly summaryService: SummaryService) {}

 @Get('appointments')
 @UseGuards(AuthGuard('jwt'), RolesGuard)
 @ApiOperation({ summary: 'Get' })
 @ApiResponse({ status: 200, description: 'Success' })
  async getapp(@Res() res: Response, @Req() req: Request) {
    try {
      const authorizationHeader = req.headers['authorization'];

      if (!authorizationHeader) {
        console.log('Authorization header is missing');
        return res.status(400).json(
          format_json(
            400,
            false,
            null,
            null,
            'Authorization header is missing',
            null,
          )
        );
      }

      const token = authorizationHeader.split(' ')[1];

      if (!token) {
        console.log('Bearer token is missing');
        return res.status(400).json(
          format_json(400, false, null, null, 'Bearer token is missing', null)
        );
      }

      const getdata = await this.summaryService.getappointments(token);

      if (getdata.status) {
        return res.status(200).json(
          format_json(200, true, null, null, 'Success', getdata.data)
        );
      } else {
        return res.status(400).json(
          format_json(400, false, null, null, 'Error Server', null)
        );
      }
    } catch (error) {
      console.error('Server Error:', error);
      return res.status(400).json(
        format_json(400, false, true, null, 'Server Error '+error, error)
      );
    }
  }

  @Post('appointments')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UsePipes(CustomValidationPipe)
  @ApiOperation({ summary: 'Create update' })
  @ApiResponse({ status: 200, description: 'Success' })
  async create(@Body() summaryDto: SummaryDto, @Res() res: Response, @Req() req: Request) {
    try {
      const authorizationHeader = req.headers['authorization'];

      if (!authorizationHeader) {
        console.log('Authorization header is missing');
        return res.status(400).json(
          format_json(
            400,
            false,
            null,
            null,
            'Authorization header is missing',
            null,
          )
        );
      }

      const token = authorizationHeader.split(' ')[1];

      if (!token) {
        console.log('Bearer token is missing');
        return res.status(400).json(
          format_json(400, false, null, null, 'Bearer token is missing', null)
        );
      }

      const create = await this.summaryService.createSummary(token, summaryDto);

      if (create.status) {
        return res.status(200).json(
          format_json(200, true, null, null, 'Success', create.data)
        );
      } else {
        return res.status(400).json(
          format_json(400, false, null, null, 'Error Server', null)
        );
      }
    } catch (error) {
      console.error('Server Error:', error);
      return res.status(400).json(
        format_json(400, false, true, null, 'Server Error '+error, error)
      );
    }
  }
}
