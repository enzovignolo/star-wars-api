import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';
import { Types } from 'mongoose';

export class MovieDTO {
  @ApiProperty({ type: String })
  _id: Types.ObjectId;
  @ApiProperty()
  director: string;
  @ApiPropertyOptional()
  episodeId?: number;
  @ApiPropertyOptional()
  openingCrawl?: string;
  @ApiPropertyOptional()
  producer?: string;
  @ApiPropertyOptional()
  releaseDate?: Date;
  @ApiProperty()
  title: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}

export class MovieQueryDTO {
  @ApiPropertyOptional()
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  page: number;
  @ApiPropertyOptional()
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  limit: number;
  constructor(opts?: { page: number; limit: number }) {
    if (opts) {
      this.page = opts.page || 1;
      this.limit = opts.limit;
    }
  }
}
