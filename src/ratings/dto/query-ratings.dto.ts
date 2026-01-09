import { IsUUID, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class QueryRatingsDto {
  @ApiProperty({
    description: 'ID của món ăn',
    example: '550e8400-e29b-41d4-a716-4466554400000',
  })
  @IsUUID()
  @IsNotEmpty()
  mealId: string;
}
