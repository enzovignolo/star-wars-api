import { Types } from 'mongoose';
import { CreateMovieDTO } from './dto/create-movies.dto';
import { Movie } from './entities/movies.entity';

export const MOVIES_REPOSITORY = 'MoviesRepository';

export interface MoviesRepository {
  getAll(): Promise<Movie[]>;
  getOne(id: Types.ObjectId): Promise<Movie>;
  createOne(createMovieDto: CreateMovieDTO): Promise<Movie>;
  updateOne(id: Types.ObjectId, data: Partial<CreateMovieDTO>): Promise<Movie>;
  deleteOne(id: Types.ObjectId): Promise<void>;
  createBulk(): Promise<void>;
}
