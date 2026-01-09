import {
  IsOptional,
  IsEnum,
  IsDateString,
  IsInt,
  Min,
  Max,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { MealType } from '../../entities/meal.entity';

export class QueryMealsDto {
  @ApiPropertyOptional({
    description: 'Ngày bắt đầu (định dạng ISO 8601)',
    example: '2024-01-01',
    format: 'date',
  })
  @IsDateString()
  @IsOptional()
  startDate?: string;

  @ApiPropertyOptional({
    description: 'Ngày kết thúc (định dạng ISO 8601)',
    example: '2024-01-31',
    format: 'date',
  })
  @IsDateString()
  @IsOptional()
  endDate?: string;

  @ApiPropertyOptional({
    description: 'Lọc theo loại bữa ăn',
    enum: MealType,
    example: MealType.LUNCH,
  })
  @IsEnum(MealType)
  @IsOptional()
  mealType?: MealType;

  @ApiPropertyOptional({
    description: 'Giới hạn số lượng kết quả',
    example: 50,
    minimum: 1,
    maximum: 100,
    default: 50,
  })
  @Transform(({ value }) => Number.parseInt(String(value), 10))
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  limit?: number = 50;

  @ApiPropertyOptional({
    description: 'Số lượng kết quả cần bỏ qua (để phân trang)',
    example: 0,
    minimum: 0,
    default: 0,
  })
  @Transform(({ value }) => Number.parseInt(String(value), 10))
  @IsInt()
  @Min(0)
  @IsOptional()
  offset?: number = 0;
}
