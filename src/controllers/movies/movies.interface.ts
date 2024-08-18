import { CreateMovieDTO } from './dto/create-movies.dto';
import { Movie } from './entities/movies.entity';

export const MOVIES_REPOSITORY = 'MoviesRepository';

export interface MoviesRepository {
  getAll(): Promise<Movie[]>;
  getOne(): Promise<Movie>;
  createOne(createMovieDto: CreateMovieDTO): Promise<Movie>;
  updateOne(): Promise<Movie>;
  deleteOne(): Promise<Movie>;
  createBulk(): Promise<void>;
}
