import { Types } from 'mongoose';

export class Movie {
  _id: Types.ObjectId;
  director: string;
  episodeId?: number;
  openingCrawl?: string;
  producer?: string;
  releaseDate?: Date;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}
