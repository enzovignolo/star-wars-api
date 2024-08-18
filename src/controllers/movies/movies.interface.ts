import { Movie } from './entities/movies.entity';

export const MOVIES_REPOSITORY = 'MoviesRepository';

export interface MoviesRepository {
  getAll(): Promise<Movie[]>;
  getOne(): Promise<Movie>;
  createOne(): Promise<Movie>;
  updateOne(): Promise<Movie>;
  deleteOne(): Promise<Movie>;
}
