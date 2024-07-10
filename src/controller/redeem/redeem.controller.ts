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
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { LastRedeemService } from 'src/service/latest/last.redeem.service';
import { format_json } from 'src/env';
import { CreateDTO } from 'src/dto/redeem/create.dto';
import { CustomValidationPipe } from 'src/custom-validation.pipe';
import { RolesGuard } from 'src/middleware/role.guard';
import { Roles } from 'src/middleware/role.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Redeem')
@Controller('api/users')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class RedeemController {
  constructor(private readonly lastRedeemService: LastRedeemService) {}

  
  @Get('redeem')
  @Roles('admin', 'manager', 'operator')
  @ApiOperation({ summary: 'get' })
  @ApiResponse({ status: 200, description: 'Success' })
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
        .json(
          format_json(
            400,
            false,
            true,
            null,
            'Server Error ' + error,
            error,
          ),
        );
    }
  }

  @Get('redeem/:id')
  @Roles('admin', 'manager', 'operator')
  @ApiOperation({ summary: 'detail' })
  @ApiResponse({ status: 200, description: 'Success' })
  async findOneRedeem(
    @Param('id') id: string,
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
        .json(
          format_json(
            400,
            false,
            true,
            null,
            'Server Error ' + error,
            error,
          ),
        );
    }
  }

  @Post('redeem')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(CustomValidationPipe)
  @Roles('admin', 'manager', 'operator')
  @ApiOperation({ summary: 'Create' })
  @ApiResponse({ status: 200, description: 'Success' })
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
        .json(
          format_json(
            400,
            false,
            true,
            null,
            'Server Error ' + error,
            error,
          ),
        );
    }
  }

  @Put('redeem/:id')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(CustomValidationPipe)
  @Roles('admin', 'manager', 'operator')
  @ApiOperation({ summary: 'Update' })
  @ApiResponse({ status: 200, description: 'Success' })
  async UpdateRedeem(
    @Param('id') id: string,
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
        .json(
          format_json(
            400,
            false,
            true,
            null,
            'Server Error ' + error,
            error,
          ),
        );
    }
  }

  @Delete('redeem/:id')
  @Roles('admin', 'manager', 'operator')
  @ApiOperation({ summary: 'Delete' })
  @ApiResponse({ status: 200, description: 'Success' })
  async deleteRedeem(
    @Param('id') id: string,
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
        .json(
          format_json(
            400,
            false,
            true,
            null,
            'Server Error ' + error,
            error,
          ),
        );
    }
  }
}
