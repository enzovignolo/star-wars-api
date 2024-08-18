import { Inject, Injectable } from '@nestjs/common';
import { MOVIES_REPOSITORY, MoviesRepository } from './movies.interface';

@Injectable()
export class MoviesService {
  constructor(
    @Inject(MOVIES_REPOSITORY)
    private readonly moviesRepository: MoviesRepository,
  ) {}
  async getAll() {
    return this.moviesRepository.getAll();
  }
}
