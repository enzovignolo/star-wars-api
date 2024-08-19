import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateMovieDTO {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  director?: string;
  @ApiPropertyOptional()
  @IsNumber()
  @IsPositive()
  @IsOptional()
  episodeId?: number;
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  openingCrawl?: string;
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  producer?: string;
  @ApiPropertyOptional()
  @IsDateString()
  releaseDate?: Date;
  @ApiProperty()
  @IsString()
  title: string;
}

export class CreatedMovieResponseDTO {
  @ApiProperty({ type: String })
  _id: Types.ObjectId;
}
