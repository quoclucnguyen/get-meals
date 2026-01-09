import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  MaxLength,
  IsDateString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MealType } from '../../entities/meal.entity';

export class CreateMealDto {
  @ApiProperty({
    description: 'Tên món ăn',
    example: 'Phở Bò',
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiPropertyOptional({
    description: 'Mô tả chi tiết về món ăn',
    example: 'Phở bò với nước dùng đậm đà và thịt bò tươi',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Loại bữa ăn',
    enum: MealType,
    example: MealType.LUNCH,
  })
  @IsEnum(MealType)
  @IsNotEmpty()
  mealType: MealType;

  @ApiProperty({
    description: 'Ngày ăn món (định dạng ISO 8601)',
    example: '2024-01-15',
    format: 'date',
  })
  @IsDateString()
  @IsNotEmpty()
  date: string;
}
