import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse as ApiResponseSwagger,
  ApiQuery,
} from '@nestjs/swagger';
import { WeatherService } from './weather.service';
import { QueryWeatherDto } from './dto';

@ApiTags('weather')
@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  @ApiOperation({
    summary: 'Lấy thông tin thời tiết',
    description: 'Lấy thông tin thời tiết tại vị trí cụ thể',
  })
  @ApiQuery({ name: 'lat', required: false, description: 'Vĩ độ' })
  @ApiQuery({ name: 'lng', required: false, description: 'Kinh độ' })
  @ApiResponseSwagger({ status: 200, description: 'Thông tin thời tiết' })
  async getWeather(@Query() query: QueryWeatherDto) {
    const weather = await this.weatherService.getWeather(query.lat, query.lng);
    return { weather };
  }
}
