import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Movie } from '../entities/movies.entity';
import { MoviesRepository } from '../movies.interface';
import { InjectModel } from '@nestjs/mongoose';
import { MovieModel } from '../schemas/movies.schema';
import { CreateMovieDTO } from '../dto/create-movies.dto';
import { Types } from 'mongoose';
import { MovieQueryDTO } from '../dto/get-movies.dto';

@Injectable()
export class MovieMongoRepository implements MoviesRepository {
  constructor(
    @InjectModel(Movie.name) private readonly movieModel: MovieModel,
  ) {}
  async getAllandCount(
    paginationParams?: MovieQueryDTO,
  ): Promise<{ movies: Movie[]; count: number }> {
    const [movies, count] = await Promise.all([
      this.movieModel
        .find()
        .limit(paginationParams.limit)
        .skip(paginationParams.limit * (paginationParams.page - 1)),
      this.movieModel.countDocuments({}),
    ]);
    return { movies, count };
  }
  async createOne(createMovieDto: CreateMovieDTO): Promise<Movie> {
    try {
      const newMovie = await this.movieModel.create(createMovieDto);
      return newMovie;
    } catch (err) {
      if (err.code) {
        if (err.code === 11000) throw new BadRequestException(err.errmsg);
      }
      return err;
    }
  }
  async getOne(id: Types.ObjectId): Promise<Movie> {
    return await this.movieModel.findById(id);
  }
  async getOneByTitle(title: string): Promise<Movie> {
    return await this.movieModel.findOne({ title });
  }
  async deleteOne(id: Types.ObjectId): Promise<void> {
    const result = await this.movieModel.findByIdAndDelete({ _id: id });
    if (!result)
      throw new NotFoundException(`Movie with id ${id} does not exist`);
    return;
  }
  async updateOne(
    id: Types.ObjectId,
    data: Partial<CreateMovieDTO>,
  ): Promise<Movie> {
    return await this.movieModel.findByIdAndUpdate({ _id: id }, data, {
      new: true,
    });
  }
  async createBulk(data: CreateMovieDTO[]): Promise<{ _id: Types.ObjectId }[]> {
    const newData = await this.movieModel.insertMany(data);

    return newData.map((movie) => ({ _id: movie._id }));
  }
}
