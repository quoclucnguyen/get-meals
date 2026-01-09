import {
  Controller,
  Get,
  Post,
  Put,
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
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { MealsService } from './meals.service';
import { CreateMealDto, UpdateMealDto, QueryMealsDto } from './dto';

@ApiTags('meals')
@Controller('meals')
export class MealsController {
  constructor(private readonly mealsService: MealsService) {}

  @Get()
  @ApiOperation({
    summary: 'Lấy danh sách món ăn',
    description: 'Lấy danh sách món ăn với các bộ lọc theo ngày, loại bữa ăn',
  })
  @ApiQuery({ name: 'startDate', required: false, description: 'Ngày bắt đầu' })
  @ApiQuery({ name: 'endDate', required: false, description: 'Ngày kết thúc' })
  @ApiQuery({
    name: 'mealType',
    required: false,
    enum: ['BREAKFAST', 'LUNCH', 'DINNER'],
    description: 'Loại bữa ăn',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Giới hạn số lượng',
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    type: Number,
    description: 'Số lượng bỏ qua (pagination)',
  })
  @ApiResponseSwagger({ status: 200, description: 'Danh sách món ăn' })
  async findAll(@Query() query: QueryMealsDto) {
    const result = await this.mealsService.findAll(query);
    return result;
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Lấy chi tiết món ăn',
    description: 'Lấy thông tin chi tiết của một món ăn theo ID',
  })
  @ApiParam({ name: 'id', description: 'ID của món ăn' })
  @ApiResponseSwagger({ status: 200, description: 'Chi tiết món ăn' })
  @ApiResponseSwagger({ status: 404, description: 'Không tìm thấy món ăn' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const meal = await this.mealsService.findOne(id);
    return { meal };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Tạo món ăn mới',
    description: 'Tạo một món ăn mới vào hệ thống',
  })
  @ApiBody({ type: CreateMealDto, description: 'Thông tin món ăn cần tạo' })
  @ApiResponseSwagger({
    status: 201,
    description: 'Món ăn được tạo thành công',
  })
  async create(@Body() createMealDto: CreateMealDto) {
    const meal = await this.mealsService.create(createMealDto);
    return { meal };
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Cập nhật món ăn',
    description: 'Cập nhật thông tin của một món ăn',
  })
  @ApiParam({ name: 'id', description: 'ID của món ăn' })
  @ApiBody({ type: UpdateMealDto, description: 'Thông tin cần cập nhật' })
  @ApiResponseSwagger({
    status: 200,
    description: 'Món ăn được cập nhật thành công',
  })
  @ApiResponseSwagger({ status: 404, description: 'Không tìm thấy món ăn' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateMealDto: UpdateMealDto,
  ) {
    const meal = await this.mealsService.update(id, updateMealDto);
    return { meal };
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Xóa món ăn',
    description: 'Xóa một món ăn khỏi hệ thống',
  })
  @ApiParam({ name: 'id', description: 'ID của món ăn' })
  @ApiResponseSwagger({
    status: 200,
    description: 'Món ăn được xóa thành công',
  })
  @ApiResponseSwagger({ status: 404, description: 'Không tìm thấy món ăn' })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.mealsService.remove(id);
    return { message: 'Meal deleted successfully' };
  }
}
