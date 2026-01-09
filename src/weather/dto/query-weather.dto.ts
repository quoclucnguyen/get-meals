import { IsOptional, IsNumber, Min, Max } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryWeatherDto {
  @ApiPropertyOptional({
    description: 'Vĩ độ',
    example: 10.8231,
    minimum: -90,
    maximum: 90,
  })
  @Transform(({ value }) => Number.parseFloat(String(value)))
  @IsNumber()
  @Min(-90)
  @Max(90)
  @IsOptional()
  lat?: number;

  @ApiPropertyOptional({
    description: 'Kinh độ',
    example: 106.6297,
    minimum: -180,
    maximum: 180,
  })
  @Transform(({ value }) => Number.parseFloat(String(value)))
  @IsNumber()
  @Min(-180)
  @Max(180)
  @IsOptional()
  lng?: number;
}
