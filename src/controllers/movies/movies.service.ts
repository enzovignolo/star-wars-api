import { Inject, Injectable } from '@nestjs/common';
import { MOVIES_REPOSITORY, MoviesRepository } from './movies.interface';
import { CreateMovieDTO } from './dto/create-movies.dto';
import { Types } from 'mongoose';
import { MovieQueryDTO } from './dto/get-movies.dto';

@Injectable()
export class MoviesService {
  constructor(
    @Inject(MOVIES_REPOSITORY)
    private readonly moviesRepository: MoviesRepository,
  ) {}
  async getAll(paginationParms?: MovieQueryDTO) {
    return this.moviesRepository.getAllandCount(paginationParms);
  }
  async createOne(createMovieDto: CreateMovieDTO) {
    return await this.moviesRepository.createOne(createMovieDto);
  }

  async getOne(id: Types.ObjectId) {
    return await this.moviesRepository.getOne(id);
  }

  async updateOne(id: Types.ObjectId, data: Partial<CreateMovieDTO>) {
    return await this.moviesRepository.updateOne(id, data);
  }
  async deleteOne(id: Types.ObjectId) {
    return await this.moviesRepository.deleteOne(id);
  }

  /**
   * service that syncs data with SWAPI
   * gets movies from api and insert them in the DB
   * or update them if exist
   */
  async syncData() {
    const response = await fetch(process.env.SWAPI_URL + '/films');
    const { results } = await response.json();

    let toUpdate = [];
    let toCreate: CreateMovieDTO[] = [];
    for (let movie of results) {
      const apiMovieData: CreateMovieDTO = {
        title: movie.title,
        director: movie.director,
        episodeId: movie.episode_id,
        openingCrawl: movie.opening_crawl,
        producer: movie.producer,
        releaseDate: movie.release_date,
      };
      const currentMovieData = await this.moviesRepository.getOneByTitle(
        movie.title,
      );
      if (!currentMovieData) toCreate.push(apiMovieData);
      else {
        toUpdate.push(
          this.moviesRepository.updateOne(currentMovieData._id, apiMovieData),
        );
      }
    }
    await Promise.all([toUpdate, this.moviesRepository.createBulk(toCreate)]);
    return { status: 'Movies synchronized with SWAPI' };
  }
}
