import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { PaginatedResponse } from '../../common/dto/pagination.dto';
import { MovieDTO } from './dto/get-movies.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  PickType,
  getSchemaPath,
} from '@nestjs/swagger';
import { MoviesService } from './movies.service';
import {
  CreateMovieDTO,
  CreatedMovieResponseDTO,
} from './dto/create-movies.dto';

@Controller('movies')
export class MoviesController {
  constructor(@Inject() private readonly moviesService: MoviesService) {}
  @ApiOkResponse({
    description: 'List of movies',
    schema: {
      allOf: [
        { $ref: getSchemaPath(PaginatedResponse) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(MovieDTO) },
            },
          },
        },
      ],
    },
  })
  @Get()
  async getAll(): Promise<PaginatedResponse<MovieDTO>> {
    const data = await this.moviesService.getAll();
    return {
      data,
      total: 0,
      currentPage: 0,
      totalPages: 0,
    };
  }

  @ApiCreatedResponse({
    type: CreatedMovieResponseDTO,
  })
  @Post()
  async createOne(
    @Body() createMovieDto: CreateMovieDTO,
  ): Promise<Pick<MovieDTO, '_id'>> {
    const movieCreated = await this.moviesService.createOne(createMovieDto);
    return { _id: movieCreated._id };
  }
}
