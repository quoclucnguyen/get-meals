import { IsEnum, IsNotEmpty } from 'class-validator';
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
}
