import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse as ApiResponseSwagger,
  ApiParam,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { RatingsService } from './ratings.service';
import { CreateRatingDto, QueryRatingsDto } from './dto';

@ApiTags('ratings')
@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Get()
  @ApiOperation({
    summary: 'Lấy đánh giá theo món ăn',
    description: 'Lấy tất cả đánh giá của một món ăn cụ thể',
  })
  @ApiQuery({
    name: 'mealId',
    required: true,
    description: 'ID của món ăn',
  })
  @ApiResponseSwagger({ status: 200, description: 'Danh sách đánh giá' })
  async findByMealId(@Query() query: QueryRatingsDto) {
    const result = await this.ratingsService.findByMealId(query.mealId);
    return result;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Tạo đánh giá mới',
    description: 'Tạo một đánh giá mới cho món ăn',
  })
  @ApiBody({
    type: CreateRatingDto,
    description: 'Thông tin đánh giá cần tạo',
  })
  @ApiResponseSwagger({
    status: 201,
    description: 'Đánh giá được tạo thành công',
  })
  async create(@Body() createRatingDto: CreateRatingDto) {
    const rating = await this.ratingsService.create(createRatingDto);
    return { rating };
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Xóa đánh giá',
    description: 'Xóa một đánh giá khỏi hệ thống',
  })
  @ApiParam({ name: 'id', description: 'ID của đánh giá' })
  @ApiResponseSwagger({
    status: 200,
    description: 'Đánh giá được xóa thành công',
  })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.ratingsService.remove(id);
    return { message: 'Rating deleted successfully' };
  }
}
