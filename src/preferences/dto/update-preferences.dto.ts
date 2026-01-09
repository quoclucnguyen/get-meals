import {
  IsArray,
  IsOptional,
  IsString,
  IsNumber,
  Min,
  Max,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePreferencesDto {
  @ApiPropertyOptional({
    description: 'Các hạn chế ăn uống',
    example: ['chay', 'lactose-free'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  dietaryRestrictions?: string[];

  @ApiPropertyOptional({
    description: 'Các nền ẩm thực yêu thích',
    example: ['Việt Nam', 'Nhật Bản', 'Thái Lan'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  favoriteCuisines?: string[];

  @ApiPropertyOptional({
    description: 'Các nguyên liệu không thích',
    example: ['đậu phụng', 'hành tây'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  dislikedIngredients?: string[];

  @ApiPropertyOptional({
    description: 'Tên địa điểm',
    example: 'Ho Chi Minh City',
  })
  @IsString()
  @IsOptional()
  locationName?: string;

  @ApiPropertyOptional({
    description: 'Vĩ độ',
    example: 10.8231,
    minimum: -90,
    maximum: 90,
  })
  @IsNumber()
  @Min(-90)
  @Max(90)
  @IsOptional()
  locationLat?: number;

  @ApiPropertyOptional({
    description: 'Kinh độ',
    example: 106.6297,
    minimum: -180,
    maximum: 180,
  })
  @IsNumber()
  @Min(-180)
  @Max(180)
  @IsOptional()
  locationLng?: number;
}
