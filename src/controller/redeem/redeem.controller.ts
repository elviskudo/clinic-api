import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Req,
  UseGuards,
  Res,
  Body,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { LastRedeemService } from 'src/service/latest/last.redeem.service';
import { format_json } from 'src/env';
import { Response } from 'express';
import { CreateDTO } from 'src/dto/redeem/create.dto';

@Controller('api/users')
export class RedeemController {
  constructor(private readonly lastRedeemService: LastRedeemService) {}

  @Get('redeem')
  @UseGuards(AuthGuard('jwt'))
  async getRedeem(@Req() req: Request, @Res() res: Response) {
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

      const getdata = await this.lastRedeemService.getRedeem(token);

      if (getdata.status) {
        return res
          .status(200)
          .json(
            format_json(200, true, null, null, getdata.message, getdata.data),
          );
      } else {
        return res
          .status(400)
          .json(format_json(400, false, null, null, getdata.message, null));
      }
    } catch (error) {
      return res
        .status(400)
        .json(format_json(400, false, true, null, 'Server Error', error));
    }
  }

  @Get('redeem/:id')
  @UseGuards(AuthGuard('jwt'))
  async findOneRedeem(
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

      const getdata = await this.lastRedeemService.findOneRedeem(token, id);

      if (getdata.status) {
        return res
          .status(200)
          .json(
            format_json(200, true, null, null, getdata.message, getdata.data),
          );
      } else {
        return res
          .status(400)
          .json(format_json(400, false, null, null, getdata.message, null));
      }
    } catch (error) {
      return res
        .status(400)
        .json(format_json(400, false, true, null, 'Server Error', error));
    }
  }

  @Post('redeem')
  @UseGuards(AuthGuard('jwt'))
  async createRedeem(
    @Body() createDTO: CreateDTO,
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

      const {
        redemption_date_and_time,
        list_of_medications,
        total_cost,
        bank_transfer_name,
        bank_id,
      } = createDTO;
      const create = await this.lastRedeemService.createRedeem(
        token,
        createDTO,
      );

      if (create.status) {
        return res
          .status(200)
          .json(
            format_json(200, true, null, null, create.message, create.data),
          );
      } else {
        return res
          .status(400)
          .json(format_json(400, false, null, null, create.message, null));
      }
    } catch (error) {
      return res
        .status(400)
        .json(format_json(400, false, true, null, 'Server Error', error));
    }
  }

  @Put('redeem/:id')
  @UseGuards(AuthGuard('jwt'))
  async UpdateRedeem(
    @Param('id') id: number,
    @Body() createDTO: CreateDTO,
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

      const {
        redemption_date_and_time,
        list_of_medications,
        total_cost,
        bank_transfer_name,
        bank_id,
      } = createDTO;
      const update = await this.lastRedeemService.updateRedeem(
        token,
        createDTO,
        id,
      );

      if (update.status) {
        return res
          .status(200)
          .json(
            format_json(200, true, null, null, update.message, update.data),
          );
      } else {
        return res
          .status(400)
          .json(format_json(400, false, null, null, update.message, null));
      }
    } catch (error) {
      return res
        .status(400)
        .json(format_json(400, false, true, null, 'Server Error', error));
    }
  }

  @Delete('redeem/:id')
  @UseGuards(AuthGuard('jwt'))
  async deleteRedeem(
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

      const deletedata = await this.lastRedeemService.deleteRedeem(token, id);

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
        .json(format_json(400, false, true, null, 'Server Error', error));
    }
  }
}
