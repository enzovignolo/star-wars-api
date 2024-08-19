import { BadRequestException, Injectable } from '@nestjs/common';
import { Movie } from '../entities/movies.entity';
import { MoviesRepository } from '../movies.interface';
import { InjectModel } from '@nestjs/mongoose';
import { MovieModel } from '../schemas/movies.schema';
import { CreateMovieDTO } from '../dto/create-movies.dto';
import { Types } from 'mongoose';
@Injectable()
export class MovieMongoRepository implements MoviesRepository {
  constructor(
    @InjectModel(Movie.name) private readonly movieModel: MovieModel,
  ) {}
  async getAll(): Promise<Movie[]> {
    return this.movieModel.find();
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
  async deleteOne(): Promise<Movie> {
    return new Movie();
  }
  async updateOne(): Promise<Movie> {
    return new Movie();
  }
  async createBulk(): Promise<void> {
    return;
  }
}
