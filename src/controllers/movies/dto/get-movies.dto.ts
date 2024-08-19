import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
