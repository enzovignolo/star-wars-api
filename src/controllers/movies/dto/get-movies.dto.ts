import { ApiProperty } from '@nestjs/swagger';

export class MovieDTO {
  @ApiProperty()
  director: string;
  @ApiProperty()
  episodeId: number;
  @ApiProperty()
  openingCrawl: string;
  @ApiProperty()
  producer: string;
  @ApiProperty()
  releaseDate: Date;
  @ApiProperty()
  title: string;
}
