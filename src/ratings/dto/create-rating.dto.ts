import {
  IsString,
  IsNotEmpty,
  IsUUID,
  IsInt,
  Min,
  Max,
  IsOptional,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRatingDto {
  @ApiProperty({
    description: 'ID của món ăn',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  @IsNotEmpty()
  mealId: string;

  @ApiProperty({
    description: 'Đánh giá từ 1-5 sao',
    example: 5,
    minimum: 1,
    maximum: 5,
  })
  @IsInt()
  @Min(1)
  @Max(5)
  @IsNotEmpty()
  rating: number;

  @ApiPropertyOptional({
    description: 'Nhận xét về món ăn',
    example: 'Món ăn rất ngon, nước dùng đậm đà',
  })
  @IsString()
  @IsOptional()
  comment?: string;
}
