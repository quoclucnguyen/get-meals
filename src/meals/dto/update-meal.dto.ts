import {
  IsString,
  IsEnum,
  IsOptional,
  MaxLength,
  IsDateString,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { MealType } from '../../entities/meal.entity';

export class UpdateMealDto {
  @ApiPropertyOptional({
    description: 'Tên món ăn',
    example: 'Phở Bò',
    maxLength: 255,
  })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  name?: string;

  @ApiPropertyOptional({
    description: 'Mô tả chi tiết về món ăn',
    example: 'Phở bò với nước dùng đậm đà và thịt bò tươi',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Loại bữa ăn',
    enum: MealType,
    example: MealType.LUNCH,
  })
  @IsEnum(MealType)
  @IsOptional()
  mealType?: MealType;

  @ApiPropertyOptional({
    description: 'Ngày ăn món (định dạng ISO 8601)',
    example: '2024-01-15',
    format: 'date',
  })
  @IsDateString()
  @IsOptional()
  date?: string;
}
