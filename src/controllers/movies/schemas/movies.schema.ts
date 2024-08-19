import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';

@Schema()
class Movie {
  @Prop()
  director: string;
  @Prop()
  episodeId: number;
  @Prop()
  openingCrawl: string;
  @Prop()
  producer: string;
  @Prop()
  releaseDate: Date;
  @Prop({ required: true, unique: true })
  title: string;
  @Prop({ default: new Date(Date.now()) })
  createdAt: Date;
  @Prop({ default: new Date(Date.now()) })
  updatedAt: Date;
}

export type MovieDocument = Movie & Document;
export type MovieModel = Model<Movie>;
export const MovieSchema = SchemaFactory.createForClass(Movie);
