import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Res,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { format_json } from 'src/env';
import { BankDto } from 'src/dto/bank/bank.dto';
import { UpdateBankDto } from 'src/dto/bank/update.bank.dto';
import { BankService } from 'src/service/bank/bank.service';
import { RolesGuard } from 'src/middleware/role.guard';
import { Roles } from 'src/middleware/role.decorator';

@Controller('api/banks')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @Post()
  @Roles('admin', 'manager', 'operator')
  async create(@Body() bankDto: BankDto, @Res() res: Response) {
    try {
      const createdBank = await this.bankService.createBank(bankDto);
      return res
        .status(201)
        .json(
          format_json(
            201,
            true,
            null,
            null,
            'Bank created successfully',
            createdBank,
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
            'Failed to create bank',
            error.message || error,
          ),
        );
    }
  }

  @Put(':id')
  @Roles('admin', 'manager', 'operator')
  async update(
    @Param('id') id: string,
    @Body() updateBankDto: UpdateBankDto,
    @Res() res: Response,
  ) {
    try {
      const updatedBank = await this.bankService.updateBank(+id, updateBankDto);
      if (!updatedBank) {
        return res
          .status(404)
          .json(
            format_json(404, false, 'Not Found', null, 'Bank not found', null),
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
            'Bank updated successfully',
            updatedBank,
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
            'Failed to update bank',
            error.message || error,
          ),
        );
    }
  }

  @Get()
  @Roles('admin', 'manager', 'operator')
  async findAll(@Res() res: Response) {
    try {
      const banks = await this.bankService.findAll();
      return res
        .status(200)
        .json(
          format_json(
            200,
            true,
            null,
            null,
            'Banks retrieved successfully',
            banks,
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
            'Failed to retrieve banks',
            error.message || error,
          ),
        );
    }
  }

  @Get(':id')
  @Roles('admin', 'manager', 'operator')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const bank = await this.bankService.findOne(+id);
      if (!bank) {
        return res
          .status(404)
          .json(
            format_json(404, false, 'Not Found', null, 'Bank not found', null),
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
            'Bank retrieved successfully',
            bank,
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
            'Failed to retrieve bank',
            error.message || error,
          ),
        );
    }
  }

  @Delete(':id')
  @Roles('admin', 'manager', 'operator')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const deletedBank = await this.bankService.removeBank(+id);
      if (!deletedBank) {
        return res
          .status(404)
          .json(
            format_json(404, false, 'Not Found', null, 'Bank not found', null),
          );
      }
      return res
        .status(200)
        .json(
          format_json(200, true, null, null, 'Bank deleted successfully', null),
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
            'Failed to delete bank',
            error.message || error,
          ),
        );
    }
  }
}
