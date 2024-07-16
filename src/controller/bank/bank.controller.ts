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
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { format_json } from 'src/env';
import { BankDto } from 'src/dto/bank/bank.dto';
import { UpdateBankDto } from 'src/dto/bank/update.bank.dto';
import { BankService } from 'src/service/bank/bank.service';
import { CustomValidationPipe } from 'src/custom-validation.pipe';
import { RolesGuard } from 'src/middleware/role.guard';
import { Roles } from 'src/middleware/role.decorator';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Bank')
@ApiSecurity('bearer')
@ApiBearerAuth()
@Controller('api/banks')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UsePipes(CustomValidationPipe)
  @Roles('admin', 'manager', 'operator')
  @ApiOperation({ summary: 'Create' })
  @ApiResponse({
    status: 201,
    description: 'Bank created successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        bank_name: { type: 'string' },
        account_number: { type: 'string' },
        account_name: { type: 'string' },
        service_charge: { type: 'number' },
        handling_fee: { type: 'number' },
        bank_category: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            category_name: { type: 'string' },
            description: { type: 'string' },
          },
        },
      },
    },
  })
  async create(@Body() bankDto: BankDto, @Res() res: Response) {
    try {
      const createdBank = await this.bankService.createBank(bankDto);
      if (createdBank.status === true) {
        return res
          .status(201)
          .json(
            format_json(
              200,
              false,
              null,
              null,
              'Bank Created Success',
              createdBank.data,
            ),
          );
      } else {
        return res
          .status(400)
          .json(
            format_json(
              400,
              false,
              createdBank.errors,
              null,
              createdBank.message,
              null,
            ),
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
            'Failed to create bank',
            error || error,
          ),
        );
    }
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UsePipes(CustomValidationPipe)
  @Roles('admin', 'manager', 'operator')
  @ApiOperation({ summary: 'Update' })
  @ApiResponse({
    status: 200,
    description: 'Bank updated successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        bank_name: { type: 'string' },
        account_number: { type: 'string' },
        account_name: { type: 'string' },
        service_charge: { type: 'number' },
        handling_fee: { type: 'number' },
        bank_category: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            category_name: { type: 'string' },
            description: { type: 'string' },
          },
        },
      },
    },
  })
  async update(
    @Param('id') id: string,
    @Body() updateBankDto: UpdateBankDto,
    @Res() res: Response,
  ) {
    try {
      const updatedBank = await this.bankService.updateBank(id, updateBankDto);
      if (updatedBank.status === true) {
        return res
          .status(201)
          .json(
            format_json(
              200,
              false,
              null,
              null,
              'Bank update Success',
              updatedBank.data,
            ),
          );
      } else {
        return res
          .status(400)
          .json(
            format_json(
              400,
              false,
              updatedBank.errors,
              null,
              updatedBank.message,
              null,
            ),
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
            'Failed to update bank',
            error || error,
          ),
        );
    }
  }

  @Get()
  @Roles('admin', 'manager', 'operator')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOperation({ summary: 'Get' })
  @ApiResponse({
    status: 200,
    description: 'Bank retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        bank_name: { type: 'string' },
        account_number: { type: 'string' },
        account_name: { type: 'string' },
        service_charge: { type: 'number' },
        handling_fee: { type: 'number' },
        bank_category: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            category_name: { type: 'string' },
            description: { type: 'string' },
          },
        },
      },
    },
  })
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
            error || error,
          ),
        );
    }
  }

  @Get(':id')
  @Roles('admin', 'manager', 'operator')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOperation({ summary: 'Detail' })
  @ApiResponse({
    status: 200,
    description: 'Bank retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        bank_name: { type: 'string' },
        account_number: { type: 'string' },
        account_name: { type: 'string' },
        service_charge: { type: 'number' },
        handling_fee: { type: 'number' },
        bank_category: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            category_name: { type: 'string' },
            description: { type: 'string' },
          },
        },
      },
    },
  })
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const bank = await this.bankService.findOne(id);
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
            error || error,
          ),
        );
    }
  }

  @Delete(':id')
  @Roles('admin', 'manager', 'operator')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOperation({ summary: 'Delete' })
  @ApiResponse({
    status: 200,
    description: 'Bank deleted successfully',
    schema: {
      type: 'object',
      properties: {
        data: { type: 'null' },
      },
    },
  })
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const deletedBank = await this.bankService.removeBank(id);
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
            error || error,
          ),
        );
    }
  }
}
