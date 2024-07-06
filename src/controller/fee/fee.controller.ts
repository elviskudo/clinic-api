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
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { format_json } from 'src/env';
import { FeeDto } from 'src/dto/fee/fee.dto';
import { UpdateFeeDto } from 'src/dto/fee/update.fee.dto';
import { FeeService } from 'src/service/fee/fee.service';
import { Roles } from 'src/middleware/role.decorator';
import { RolesGuard } from 'src/middleware/role.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/fees')
@UseGuards(RolesGuard)
export class FeeController {
  constructor(private readonly feeService: FeeService) {}

  @Post()
  @Roles('admin', 'manager', 'operator')
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Body() feeDto: FeeDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const createdFee = await this.feeService.createFee(feeDto);
      return res
        .status(201)
        .json(
          format_json(
            201,
            true,
            null,
            null,
            'Fee created successfully',
            createdFee,
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
            'Failed to create fee',
            error,
          ),
        );
    }
  }

  @Put(':id')
  @Roles('admin', 'manager', 'operator')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id') id: string,
    @Body() updateFeeDto: UpdateFeeDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const fee = await this.feeService.findOne(+id);
      if (!fee) {
        return res
          .status(404)
          .json(format_json(404, false, null, null, 'Fee not found', null));
      }

      const updatedFee = await this.feeService.updateFee(+id, updateFeeDto);
      return res
        .status(200)
        .json(
          format_json(
            200,
            true,
            null,
            null,
            'Fee updated successfully',
            updatedFee,
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
            'Failed to update fee',
            error,
          ),
        );
    }
  }

  @Get()
  @Roles('admin', 'manager', 'operator')
  @UseGuards(AuthGuard('jwt'))
  async findAll(@Req() req: Request, @Res() res: Response) {
    try {
      const fees = await this.feeService.findAll();
      return res
        .status(200)
        .json(
          format_json(
            200,
            true,
            null,
            null,
            'Fees retrieved successfully',
            fees,
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
            'Failed to retrieve fees',
            error,
          ),
        );
    }
  }

  @Get(':id')
  @Roles('admin', 'manager', 'operator')
  @UseGuards(AuthGuard('jwt'))
  async findOne(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const fee = await this.feeService.findOne(+id);
      if (!fee) {
        return res
          .status(404)
          .json(format_json(404, false, null, null, 'Fee not found', null));
      }
      return res
        .status(200)
        .json(
          format_json(200, true, null, null, 'Fee retrieved successfully', fee),
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
            'Failed to retrieve fee',
            error,
          ),
        );
    }
  }

  @Delete(':id')
  @Roles('admin', 'manager', 'operator')
  @UseGuards(AuthGuard('jwt'))
  async remove(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const fee = await this.feeService.findOne(+id);
      if (!fee) {
        return res
          .status(404)
          .json(format_json(404, false, null, null, 'Fee not found', null));
      }

      await this.feeService.removeFee(+id);
      return res
        .status(200)
        .json(
          format_json(200, true, null, null, 'Fee deleted successfully', null),
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
            'Failed to delete fee',
            error,
          ),
        );
    }
  }
}
