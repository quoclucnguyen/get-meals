import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse as ApiResponseSwagger,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { RecommendationsService } from './recommendations.service';
import { GetRecommendationsDto, RefreshRecommendationsDto } from './dto';

@ApiTags('recommendations')
@Controller('recommendations')
export class RecommendationsController {
  constructor(
    private readonly recommendationsService: RecommendationsService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Lấy gợi ý món ăn',
    description:
      'Lấy danh sách gợi ý món ăn dựa trên sở thích và thời tiết hiện tại',
  })
  @ApiQuery({
    name: 'mealType',
    required: true,
    enum: ['BREAKFAST', 'LUNCH', 'DINNER'],
    description: 'Loại bữa ăn',
  })
  @ApiResponseSwagger({
    status: 200,
    description: 'Danh sách gợi ý món ăn',
  })
  async getRecommendations(@Query() query: GetRecommendationsDto) {
    const result = await this.recommendationsService.getRecommendations(
      query.mealType,
    );
    return result;
  }

  @Post('refresh')
  @ApiOperation({
    summary: 'Làm mới gợi ý món ăn',
    description: 'Làm mới danh sách gợi ý món ăn với các đề xuất mới từ AI',
  })
  @ApiBody({
    type: RefreshRecommendationsDto,
    description: 'Loại bữa ăn cần làm mới gợi ý',
  })
  @ApiResponseSwagger({
    status: 200,
    description: 'Danh sách gợi ý mới',
  })
  async refreshRecommendations(@Body() body: RefreshRecommendationsDto) {
    const result = await this.recommendationsService.refreshRecommendations(
      body.mealType,
    );
    return result;
  }
}
