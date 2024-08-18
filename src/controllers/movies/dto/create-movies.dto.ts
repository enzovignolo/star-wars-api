import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateMovieDTO {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  director: string;
  @ApiPropertyOptional()
  @IsNumber()
  @IsPositive()
  @IsOptional()
  episodeId: number;
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  openingCrawl: string;
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  producer: string;
  @ApiPropertyOptional()
  @IsDateString()
  releaseDate: Date;
  @ApiProperty()
  @IsString()
  title: string;
}
