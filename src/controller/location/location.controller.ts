import { Controller, Get, Query } from '@nestjs/common';
import { WilayahService } from 'src/service/location/location.service';

@Controller('/api/v2/cities')
export class WilayahController {
  constructor(private readonly wilayahService: WilayahService) {}

  @Get()
  async findAllCities(
    @Query('q') query: string = '',
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('order') order: 'ASC' | 'DESC' = 'ASC',
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
        data: cities
      };
    } catch (error) {
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
