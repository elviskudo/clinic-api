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
  Req
} from '@nestjs/common';
import { Response, Request } from 'express';
import { format_json } from 'src/env';
import { SummaryDto } from 'src/dto/summary/summary.dto';
import { SummaryService } from 'src/service/summary/summary.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/users')
export class SummaryController {
  constructor(private readonly summaryService: SummaryService) {}

  @Get('appointments')
  @UseGuards(AuthGuard('jwt'))
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
        format_json(400, false, true, null, 'Server Error', error)
      );
    }
  }

  @Post('appointments')
  @UseGuards(AuthGuard('jwt'))
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
        format_json(400, false, true, null, 'Server Error', error)
      );
    }
  }

  // @Put('summary/:id')
  // async update(
  //   @Param('id') id: string,
  //   @Body() updateSummaryDto: UpdateSummaryDto,
  //   @Res() res: Response,
  // ) {
  //   try {
  //     const updatedSummary = await this.summaryService.updateSummary(
  //       +id,
  //       updateSummaryDto,
  //     );
  //     return res.status(200).json(
  //       format_json(
  //         200,
  //         true,
  //         null,
  //         null,
  //         'Summary updated successfully',
  //         updatedSummary,
  //       )
  //     );
  //   } catch (error) {
  //     console.error('Failed to update summary:', error);
  //     return res.status(400).json(
  //       format_json(
  //         400,
  //         false,
  //         'Bad Request',
  //         null,
  //         'Failed to update summary',
  //         null,
  //       )
  //     );
  //   }
  // }

  // @Get('summary')
  // async findAll(@Res() res: Response) {
  //   try {
  //     const summaries = await this.summaryService.findAllSummaries();
  //     return res.status(200).json(
  //       format_json(
  //         200,
  //         true,
  //         null,
  //         null,
  //         'Summaries retrieved successfully',
  //         summaries,
  //       )
  //     );
  //   } catch (error) {
  //     console.error('Failed to retrieve summaries:', error);
  //     return res.status(500).json(
  //       format_json(
  //         500,
  //         false,
  //         'Internal Server Error',
  //         null,
  //         'Failed to retrieve summaries',
  //         null,
  //       )
  //     );
  //   }
  // }

  // @Get('summary/:id')
  // async findOne(@Param('id') id: string, @Res() res: Response) {
  //   try {
  //     const summary = await this.summaryService.findSummaryById(+id);
  //     return res.status(200).json(
  //       format_json(
  //         200,
  //         true,
  //         null,
  //         null,
  //         'Summary retrieved successfully',
  //         summary,
  //       )
  //     );
  //   } catch (error) {
  //     console.error('Failed to retrieve summary:', error);
  //     return res.status(500).json(
  //       format_json(
  //         500,
  //         false,
  //         'Internal Server Error',
  //         null,
  //         'Failed to retrieve summary',
  //         null,
  //       )
  //     );
  //   }
  // }

  // @Delete('summary/:id')
  // async remove(@Param('id') id: string, @Res() res: Response) {
  //   try {
  //     await this.summaryService.removeSummary(+id);
  //     return res.status(200).json(
  //       format_json(
  //         200,
  //         true,
  //         null,
  //         null,
  //         'Summary deleted successfully',
  //         null,
  //       )
  //     );
  //   } catch (error) {
  //     console.error('Failed to delete summary:', error);
  //     return res.status(500).json(
  //       format_json(
  //         500,
  //         false,
  //         'Internal Server Error',
  //         null,
  //         'Failed to delete summary',
  //         null,
  //       )
  //     );
  //   }
  // }
}
