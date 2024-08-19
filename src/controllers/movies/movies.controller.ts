import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PaginatedResponse } from '../../common/dto/pagination.dto';
import { MovieDTO } from './dto/get-movies.dto';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { MoviesService } from './movies.service';
import {
  CreateMovieDTO,
  CreatedMovieResponseDTO,
} from './dto/create-movies.dto';
import { ObjectIdParam } from '../../common/dto/params.dto';

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

  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'APP synced with SWAPI' },
      },
    },
    description: 'Sincronización de la APP con SWAPI',
  })
  @Get('/sync')
  async syncMovies() {
    return await this.moviesService.syncData();
  }
  @ApiOkResponse({ type: MovieDTO })
  @Get('/:id')
  async getOne(@Param() params: ObjectIdParam) {
    return await this.moviesService.getOne(params.id);
  }

  @ApiOkResponse({
    type: MovieDTO,
  })
  @Put('/:id')
  async updateOne(
    @Param() params: ObjectIdParam,
    @Body() data: Partial<CreateMovieDTO>,
  ): Promise<MovieDTO> {
    return await this.moviesService.updateOne(params.id, data);
  }

  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  async deleteOne(@Param() params: ObjectIdParam): Promise<void> {
    return await this.moviesService.deleteOne(params.id);
  }
}
