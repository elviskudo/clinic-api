import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  HttpException,
  Res,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { RolesGuard } from 'src/middleware/role.guard';
import { Roles } from 'src/middleware/role.decorator';
import { format_json } from 'src/env';
import { BankDto } from 'src/dto/bank/bank.dto';
import { UpdateBankDto } from 'src/dto/bank/update.bank.dto';
import { BankService } from 'src/service/bank/bank.service';

@Controller('api/banks')
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
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
            null,
          ),
        );
    }
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  async update(
    @Param('id') id: string,
    @Body() updateBankDto: UpdateBankDto,
    @Res() res: Response,
  ) {
    try {
      const updatedBank = await this.bankService.updateBank(+id, updateBankDto);
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
            null,
          ),
        );
    }
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'patient', 'doctor')
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
            null,
          ),
        );
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'patient', 'doctor')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const bank = await this.bankService.findOne(+id);
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
            null,
          ),
        );
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.bankService.removeBank(+id);
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
            null,
          ),
        );
    }
  }
}
