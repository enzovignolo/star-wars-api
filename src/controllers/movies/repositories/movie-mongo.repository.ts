import { Injectable } from '@nestjs/common';
import { Movie } from '../entities/movies.entity';
import { MoviesRepository } from '../movies.interface';
import { InjectModel } from '@nestjs/mongoose';
import { MovieModel } from '../schemas/movies.schema';
@Injectable()
export class MovieMongoRepository implements MoviesRepository {
  constructor(
    @InjectModel(Movie.name) private readonly movieModel: MovieModel,
  ) {}
  async getAll(): Promise<Movie[]> {
    return this.movieModel.find();
  }
  async createOne(): Promise<Movie> {
    return new Movie();
  }
  async getOne(): Promise<Movie> {
    return new Movie();
  }
  async deleteOne(): Promise<Movie> {
    return new Movie();
  }
  async updateOne(): Promise<Movie> {
    return new Movie();
  }
}
