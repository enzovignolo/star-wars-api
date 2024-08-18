import { Controller, Get, Inject } from '@nestjs/common';
import { PaginatedResponse } from '../../common/dto/pagination.dto';
import { MovieDTO } from './dto/get-movies.dto';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { MoviesService } from './movies.service';

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
}
