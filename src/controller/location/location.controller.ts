import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WilayahService } from 'src/service/location/location.service';

@ApiTags('Wilayah / City')
@Controller('/api/v2/cities')
export class WilayahController {
  constructor(private readonly wilayahService: WilayahService) {}

  @Get()
  @ApiOperation({ summary: 'Get' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiQuery({ name: 'q', required: false, type: String })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'order', required: false, enum: ['asc', 'desc'], example: 'asc' })
  async findAllCities(
    @Query('q') query: string = '',
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('order') order: 'asc' | 'desc' = 'asc',
  ) {
    try {
      const cities = await this.wilayahService.getCities(
        query,
        page,
        limit,
        order,
      );
      return {
        status: 200,
        success: true,
        errors: false,
        meta: {
          page,
          limit,
          order,
        },
        data: cities,
      };
    } catch (error: any) {
      return {
        status: 500,
        success: false,
        errors: true,
        message: 'Internal Server Error',
        error: error.message,
      };
    }
  }
}
