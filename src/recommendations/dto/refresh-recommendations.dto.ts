import { IsDateString, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MealType } from '../../entities/meal.entity';

export class RefreshRecommendationsDto {
  @ApiProperty({
    description: 'Loại bữa ăn cần làm mới gợi ý',
    enum: MealType,
    example: MealType.LUNCH,
  })
  @IsEnum(MealType)
  @IsNotEmpty()
  mealType: MealType;

  @ApiProperty({
    description: 'Ngày cần làm mới gợi ý (YYYY-MM-DD)',
    example: '2024-01-15',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  date?: string;
}
