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
import { format_json } from 'src/env';
import { PaymentService } from 'src/service/payment/payment.service';
import { paymentDTO } from 'src/dto/payment/payment.dto';
import { CustomValidationPipe } from 'src/custom-validation.pipe';
import { RolesGuard } from 'src/middleware/role.guard';
import { Roles } from 'src/middleware/role.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Payment')
@Controller('api/users')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get('payment')
  @Roles('admin', 'manager', 'operator')
  @ApiOperation({ summary: 'Get' })
  @ApiResponse({ status: 200, description: 'Success' })
  async getPayment(@Req() req: Request, @Res() res: Response) {
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

      const getdata = await this.paymentService.getdata(token);

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
          format_json(400, false, true, null, 'Server Error ' + error, error),
        );
    }
  }

  @Post('payment')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(CustomValidationPipe)
  @Roles('admin', 'manager', 'operator')
  @ApiOperation({ summary: 'Create' })
  @ApiResponse({ status: 200, description: 'Success' })
  async createPayment(
    @Body() createDTO: paymentDTO,
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

      const create = await this.paymentService.createpayment(token, createDTO);

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
          format_json(400, false, true, null, 'Server Error ' + error, error),
        );
    }
  }

  @Put('payment/:id')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(CustomValidationPipe)
  @Put('payment/:id')
  @Roles('admin', 'manager', 'operator')
  @ApiOperation({ summary: 'Update' })
  @ApiResponse({ status: 200, description: 'Success' })
  async updatePayment(
    @Param('id') id: string,
    @Body() createDTO: paymentDTO,
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

      const update = await this.paymentService.update(token, createDTO, id);

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
          format_json(400, false, true, null, 'Server Error ' + error, error),
        );
    }
  }

  @Delete('payment/:id')
  @Roles('admin', 'manager', 'operator')
  @ApiOperation({ summary: 'Delete' })
  @ApiResponse({ status: 200, description: 'Success' })
  async deletePayment(
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

      const deleteData = await this.paymentService.delete(token, id);

      if (deleteData.status) {
        return res
          .status(200)
          .json(
            format_json(
              200,
              true,
              null,
              null,
              deleteData.message,
              deleteData.data,
            ),
          );
      } else {
        return res
          .status(400)
          .json(format_json(400, false, null, null, deleteData.message, null));
      }
    } catch (error) {
      return res
        .status(400)
        .json(
          format_json(400, false, true, null, 'Server Error ' + error, error),
        );
    }
  }
}
