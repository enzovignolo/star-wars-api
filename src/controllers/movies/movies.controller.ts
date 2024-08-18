import { Controller, Get } from '@nestjs/common';
import { PaginatedResponse } from '../../common/dto/pagination.dto';
import { MovieDTO } from './dto/get-movies.dto';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

@Controller('movies')
export class MoviesController {
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
  getAll(): PaginatedResponse<MovieDTO> {
    const data = [];
    return {
      data,
      total: 0,
      currentPage: 0,
      totalPages: 0,
    };
  }
}
