import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { PaymentDetailsDto } from 'src/dto/payment/payment.details.dto';
import { UpdatePaymentDetailsDto } from 'src/dto/payment/update.payment.details.dto';
import { format_json } from 'src/env';
import { PaymentDetailsService } from 'src/service/payment/payment.details.service';

@Controller('api/payment-details')
export class PaymentDetailsController {
  constructor(private readonly paymentDetailsService: PaymentDetailsService) {}

  @Post()
  async create(
    @Body() paymentDetailsDto: PaymentDetailsDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const createdPaymentDetails =
        await this.paymentDetailsService.createPaymentDetails(
          paymentDetailsDto,
        );
      return res
        .status(201)
        .json(
          format_json(
            201,
            true,
            null,
            null,
            'PaymentDetails created successfully',
            createdPaymentDetails,
          ),
        );
    } catch (error) {
      return res
        .status(400)
        .json(
          format_json(
            400,
            false,
            'Bad Request',
            null,
            'Failed to create PaymentDetails',
            error,
          ),
        );
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePaymentDetailsDto: UpdatePaymentDetailsDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const paymentDetails = await this.paymentDetailsService.findOne(+id);
      if (!paymentDetails) {
        return res
          .status(404)
          .json(
            format_json(
              404,
              false,
              null,
              null,
              'PaymentDetails not found',
              null,
            ),
          );
      }

      const updatedPaymentDetails =
        await this.paymentDetailsService.updatePaymentDetails(
          +id,
          updatePaymentDetailsDto,
        );
      return res
        .status(200)
        .json(
          format_json(
            200,
            true,
            null,
            null,
            'PaymentDetails updated successfully',
            updatedPaymentDetails,
          ),
        );
    } catch (error) {
      return res
        .status(400)
        .json(
          format_json(
            400,
            false,
            'Bad Request',
            null,
            'Failed to update PaymentDetails',
            error,
          ),
        );
    }
  }

  @Get()
  async findAll(@Req() req: Request, @Res() res: Response) {
    try {
      const paymentDetailsList = await this.paymentDetailsService.findAll();
      return res
        .status(200)
        .json(
          format_json(
            200,
            true,
            null,
            null,
            'PaymentDetails retrieved successfully',
            paymentDetailsList,
          ),
        );
    } catch (error) {
      return res
        .status(500)
        .json(
          format_json(
            500,
            false,
            'Internal Server Error',
            null,
            'Failed to retrieve PaymentDetails',
            error,
          ),
        );
    }
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const paymentDetails = await this.paymentDetailsService.findOne(+id);
      if (!paymentDetails) {
        return res
          .status(404)
          .json(
            format_json(
              404,
              false,
              null,
              null,
              'PaymentDetails not found',
              null,
            ),
          );
      }
      return res
        .status(200)
        .json(
          format_json(
            200,
            true,
            null,
            null,
            'PaymentDetails retrieved successfully',
            paymentDetails,
          ),
        );
    } catch (error) {
      return res
        .status(500)
        .json(
          format_json(
            500,
            false,
            'Internal Server Error',
            null,
            'Failed to retrieve PaymentDetails',
            error,
          ),
        );
    }
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const paymentDetails = await this.paymentDetailsService.findOne(+id);
      if (!paymentDetails) {
        return res
          .status(404)
          .json(
            format_json(
              404,
              false,
              null,
              null,
              'PaymentDetails not found',
              null,
            ),
          );
      }

      await this.paymentDetailsService.removePaymentDetails(+id);
      return res
        .status(200)
        .json(
          format_json(
            200,
            true,
            null,
            null,
            'PaymentDetails deleted successfully',
            null,
          ),
        );
    } catch (error) {
      return res
        .status(500)
        .json(
          format_json(
            500,
            false,
            'Internal Server Error',
            null,
            'Failed to delete PaymentDetails',
            error,
          ),
        );
    }
  }
}
