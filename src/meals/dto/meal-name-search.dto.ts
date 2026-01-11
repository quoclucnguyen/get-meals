import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MealNameSearchDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Từ khóa tìm kiếm tên món ăn',
    example: 'Phở',
  })
  query?: string;
}
