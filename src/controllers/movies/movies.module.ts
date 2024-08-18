import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie } from './entities/movies.entity';
import { MovieSchema } from './schemas/movies.schema';
import { MoviesService } from './movies.service';
import { MOVIES_REPOSITORY } from './movies.interface';
import { MovieMongoRepository } from './repositories/movie-mongo.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
  ],
  controllers: [MoviesController],
  providers: [
    MoviesService,
    { provide: MOVIES_REPOSITORY, useClass: MovieMongoRepository },
  ],
})
export class MoviesModule {}
