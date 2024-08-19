import { Inject, Injectable } from '@nestjs/common';
import { MOVIES_REPOSITORY, MoviesRepository } from './movies.interface';
import { CreateMovieDTO } from './dto/create-movies.dto';
import { Types } from 'mongoose';

@Injectable()
export class MoviesService {
  constructor(
    @Inject(MOVIES_REPOSITORY)
    private readonly moviesRepository: MoviesRepository,
  ) {}
  async getAll() {
    return this.moviesRepository.getAll();
  }
  async createOne(createMovieDto: CreateMovieDTO) {
    return await this.moviesRepository.createOne(createMovieDto);
  }

  async getOne(id: Types.ObjectId) {
    return await this.moviesRepository.getOne(id);
  }
}
