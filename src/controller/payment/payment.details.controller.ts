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
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiSecurity,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Request, Response } from 'express';
import { CustomValidationPipe } from 'src/custom-validation.pipe';
import { PaymentDetailsDto } from 'src/dto/payment/payment.details.dto';
import { UpdatePaymentDetailsDto } from 'src/dto/payment/update.payment.details.dto';
import { format_json } from 'src/env';
import { Roles } from 'src/middleware/role.decorator';
import { RolesGuard } from 'src/middleware/role.guard';
import { PaymentDetailsService } from 'src/service/payment/payment.details.service';

@ApiTags('Payment details')
@ApiSecurity('bearer')
@ApiBearerAuth()
@Controller('api/payment-details')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class PaymentDetailsController {
  constructor(private readonly paymentDetailsService: PaymentDetailsService) {}

  @Post()
  @Roles('admin', 'manager', 'operator')
  @UsePipes(CustomValidationPipe)
  @ApiOperation({ summary: 'Create Payment Details' })
  @ApiResponse({
    status: 201,
    description: 'PaymentDetails created successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        payment_id: { type: 'number' },
        drug_id: { type: 'number' },
        quantity: { type: 'number' },
        fee_id: { type: 'number' },
      },
    },
  })
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
        if (createdPaymentDetails.status) {
          return res.status(200).json(
            format_json(200, true, null, null, createdPaymentDetails.message, createdPaymentDetails.data)
          );
        } else {
          return res.status(400).json(
            format_json(400, false, null, createdPaymentDetails.data, 'Error Server', null)
          );
        }
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
  @Roles('admin', 'manager', 'operator')
  @UsePipes(CustomValidationPipe)
  @ApiOperation({ summary: 'Update Payment Details' })
  @ApiResponse({
    status: 200,
    description: 'PaymentDetails updated successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        payment_id: { type: 'number' },
        drug_id: { type: 'number' },
        quantity: { type: 'number' },
        fee_id: { type: 'number' },
      },
    },
  })
  async update(
    @Param('id') id: string,
    @Body() updatePaymentDetailsDto: UpdatePaymentDetailsDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const paymentDetails = await this.paymentDetailsService.findOne(id);
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
          id,
          updatePaymentDetailsDto,
        );
        if (updatedPaymentDetails.status) {
          return res.status(200).json(
            format_json(200, true, null, null, updatedPaymentDetails.message, updatedPaymentDetails.data)
          );
        } else {
          return res.status(400).json(
            format_json(400, false, null, updatedPaymentDetails.data, 'Error Server', null)
          );
        }
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
  @Roles('admin', 'manager', 'operator')
  @ApiOperation({ summary: 'Get all Payment Details' })
  @ApiResponse({
    status: 200,
    description: 'PaymentDetails retrieved successfully',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          payment_id: { type: 'number' },
          drug_id: { type: 'number' },
          quantity: { type: 'number' },
          fee_id: { type: 'number' },
        },
      },
    },
  })
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
  @Roles('admin', 'manager', 'operator')
  @ApiOperation({ summary: 'Get Payment Details by ID' })
  @ApiResponse({
    status: 200,
    description: 'PaymentDetails retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        payment_id: { type: 'number' },
        drug_id: { type: 'number' },
        quantity: { type: 'number' },
        fee_id: { type: 'number' },
      },
    },
  })
  async findOne(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const paymentDetails = await this.paymentDetailsService.findOne(id);
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
  @Roles('admin', 'manager', 'operator')
  @ApiOperation({ summary: 'Delete Payment Details' })
  @ApiResponse({
    status: 200,
    description: 'PaymentDetails deleted successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        payment_id: { type: 'number' },
        drug_id: { type: 'number' },
        quantity: { type: 'number' },
        fee_id: { type: 'number' },
      },
    },
  })
  async remove(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const paymentDetails = await this.paymentDetailsService.findOne(id);
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

      await this.paymentDetailsService.removePaymentDetails(id);
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
