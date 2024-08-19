import { Types } from 'mongoose';
import { CreateMovieDTO } from './dto/create-movies.dto';
import { Movie } from './entities/movies.entity';
import { MovieQueryDTO } from './dto/get-movies.dto';

export const MOVIES_REPOSITORY = 'MoviesRepository';

export interface MoviesRepository {
  getAllandCount(
    paginationParms?: MovieQueryDTO,
  ): Promise<{ movies: Movie[]; count: number }>;
  getOne(id: Types.ObjectId): Promise<Movie>;
  getOneByTitle(title: string): Promise<Movie | null>;
  createOne(createMovieDto: CreateMovieDTO): Promise<Movie>;
  updateOne(id: Types.ObjectId, data: Partial<CreateMovieDTO>): Promise<Movie>;
  deleteOne(id: Types.ObjectId): Promise<void>;
  createBulk(data: CreateMovieDTO[]): Promise<{ _id: Types.ObjectId }[]>;
}
