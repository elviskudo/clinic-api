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
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/middleware/role.guard';
import { Roles } from 'src/middleware/role.decorator';
import { format_json } from 'src/env';
import { SymptomService } from 'src/service/symptom.service';
import { SymptomDto } from 'src/dto/symptom/symptom.dto';
import { UpdateSymptomDto } from 'src/dto/symptom/update.symptom.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Symptoms')
@Controller('api/symptoms')
export class SymptomController {
  constructor(private readonly symptomService: SymptomService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'manager', 'operator')
  @ApiOperation({ summary: 'Create' })
  @ApiResponse({ status: 200, description: 'Success' })
  async create(@Body() symptomDto: SymptomDto) {
    try {
      const createdSymptom =
      await this.symptomService.createSymptom(symptomDto);
      return format_json(
        201,
        true,
        null,
        null,
        'Symptom created successfully',
        createdSymptom,
      );
    } catch (error : any) {
      throw new HttpException(
        format_json(
          400,
          false,
          'Bad Request',
          null,
          'Failed to create symptom',
          error.message,
        ),
        400,
      );
    }
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'manager', 'operator')
  @ApiOperation({ summary: 'Update' })
  @ApiResponse({ status: 200, description: 'Success' })
  async update(
    @Param('id') id: string,
    @Body() updateSymptomDto: UpdateSymptomDto,
  ) {
    try {
      const updatedSymptom = await this.symptomService.updateSymptom(
        id,
        updateSymptomDto,
      );
      return format_json(
        200,
        true,
        null,
        null,
        'Symptom updated successfully',
        updatedSymptom,
      );
    } catch (error : any) {
      throw new HttpException(
        format_json(
          400,
          false,
          'Bad Request',
          null,
          'Failed to create symptom',
          error.message,
        ),
        400,
      );
    }
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'manager', 'operator', 'patient', 'doctor', 'guest')
  @ApiOperation({ summary: 'Get' })
  @ApiResponse({ status: 200, description: 'Success' })
  async findAll() {
    try {
      const symptoms = await this.symptomService.findAll();
      return format_json(
        200,
        true,
        null,
        null,
        'Symptoms retrieved successfully',
        symptoms,
      );
    } catch (error : any) {
      throw new HttpException(
        format_json(
          400,
          false,
          'Bad Request',
          null,
          'Failed to create symptom',
          error.message,
        ),
        400,
      );
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'manager', 'operator', 'patient', 'doctor', 'guest')
  @ApiOperation({ summary: 'Details' })
  @ApiResponse({ status: 200, description: 'Success' })
  async findOne(@Param('id') id: string) {
    try {
      const symptom = await this.symptomService.findOne(id);
      return format_json(
        200,
        true,
        null,
        null,
        'Symptom retrieved successfully',
        symptom,
      );
    } catch (error : any) {
      throw new HttpException(
        format_json(
          400,
          false,
          'Bad Request',
          null,
          'Failed to create symptom',
          error.message,
        ),
        400,
      );
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'manager', 'operator')
  @ApiOperation({ summary: 'Delete' })
  @ApiResponse({ status: 200, description: 'Success' })
  async remove(@Param('id') id: string) {
    try {
      await this.symptomService.removeSymptom(id);
      return format_json(
        200,
        true,
        null,
        null,
        'Symptom deleted successfully',
        null,
      );
    } catch (error : any) {
      throw new HttpException(
        format_json(
          400,
          false,
          'Bad Request',
          null,
          'Failed to create symptom',
          error.message,
        ),
        400,
      );
    }
  }
}
