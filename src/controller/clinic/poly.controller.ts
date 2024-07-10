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
  HttpException,
  UsePipes,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { RolesGuard } from 'src/middleware/role.guard';
import { Roles } from 'src/middleware/role.decorator';
import { format_json } from 'src/env';
import { PolyDto } from 'src/dto/clinic/poly.dto';
import { UpdatePolyDto } from 'src/dto/clinic/update.poly.dto';
import { PolyService } from 'src/service/clinic/poly.service';
import { CustomValidationPipe } from 'src/custom-validation.pipe';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Polies')
@Controller('api/polies')
export class PolyController {
  constructor(private readonly polyService: PolyService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UsePipes(CustomValidationPipe)
  @Roles('admin', 'manager', 'operator')
  @ApiOperation({ summary: 'Create' })
  @ApiResponse({ status: 200, description: 'Success' })
  async create(@Body() polyDto: PolyDto, @Res() res: Response) {
    try {
      const createdPoly = await this.polyService.createPoly(polyDto);
      return res
        .status(201)
        .json(
          format_json(
            201,
            true,
            null,
            null,
            'Poly created successfully',
            createdPoly,
          ),
        );
      } catch (error:any) {
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json(
            format_json(
              500,
              false,
              true,
              null,
              'Server Error ' + error,
              error.message,
            ),
          );
      }
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UsePipes(CustomValidationPipe)
  @Roles('admin', 'manager', 'operator')
  @ApiOperation({ summary: 'Update' })
  @ApiResponse({ status: 200, description: 'Success' })
  async update(
    @Param('id') id: string,
    @Body() updatePolyDto: UpdatePolyDto,
    @Res() res: Response,
  ) {
    try {
      const updatedPoly = await this.polyService.updatePoly(id, updatePolyDto);
      return res
        .status(200)
        .json(
          format_json(
            200,
            true,
            null,
            null,
            'Poly updated successfully',
            updatedPoly,
          ),
        );
      } catch (error:any) {
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json(
            format_json(
              500,
              false,
              true,
              null,
              'Server Error ' + error,
              error.message,
            ),
          );
      }
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'manager', 'operator', 'patient', 'doctor', 'guest')
  @ApiOperation({ summary: 'Get' })
  @ApiResponse({ status: 200, description: 'Success' })
  async findAll(@Res() res: Response) {
    try {
      const polies = await this.polyService.findAll();
      return res
        .status(200)
        .json(
          format_json(
            200,
            true,
            null,
            null,
            'Polies retrieved successfully',
            polies,
          ),
        );
      } catch (error:any) {
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json(
            format_json(
              500,
              false,
              true,
              null,
              'Server Error ' + error,
              error.message,
            ),
          );
      }
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'manager', 'operator', 'patient', 'doctor', 'guest')
  @ApiOperation({ summary: 'Details' })
  @ApiResponse({ status: 200, description: 'Success' })
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const poly = await this.polyService.findOne(id);
      return res
        .status(200)
        .json(
          format_json(
            200,
            true,
            null,
            null,
            'Poly retrieved successfully',
            poly,
          ),
        );
      } catch (error:any) {
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json(
            format_json(
              500,
              false,
              true,
              null,
              'Server Error ' + error,
              error.message,
            ),
          );
      }
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'manager', 'operator')
  @ApiOperation({ summary: 'Delete' })
  @ApiResponse({ status: 200, description: 'Success' })
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.polyService.removePoly(id);
      return res
        .status(200)
        .json(
          format_json(200, true, null, null, 'Poly deleted successfully', null),
        );
      } catch (error:any) {
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json(
            format_json(
              500,
              false,
              true,
              null,
              'Server Error ' + error,
              error.message,
            ),
          );
      }
  }
}
