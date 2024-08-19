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
  UseGuards,
} from '@nestjs/common';
import { PaginatedResponse } from '../../common/dto/pagination.dto';
import { MovieDTO } from './dto/get-movies.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { MoviesService } from './movies.service';
import {
  CreateMovieDTO,
  CreatedMovieResponseDTO,
} from './dto/create-movies.dto';
import { ObjectIdParam } from '../../common/dto/params.dto';
import { AuthGuard } from '../auth/auth.guard';
import { AdminGuard } from '../auth/admin.guard';

@ApiBearerAuth()
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
  @ApiUnauthorizedResponse({
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', enum: [401] },
        message: { type: 'string', enum: ['Unauthorized'] },
      },
    },
  })
  @UseGuards(AuthGuard)
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
  @ApiUnauthorizedResponse({
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', enum: [401] },
        message: { type: 'string', enum: ['Unauthorized'] },
      },
    },
  })
  @ApiForbiddenResponse({
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        status: { type: 'number', enum: [403] },
        error: { type: 'string', enum: ['Forbidden'] },
      },
    },
  })
  @UseGuards(AuthGuard, AdminGuard)
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
  @ApiUnauthorizedResponse({
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', enum: [401] },
        message: { type: 'string', enum: ['Unauthorized'] },
      },
    },
  })
  @ApiForbiddenResponse({
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        status: { type: 'number', enum: [403] },
        error: { type: 'string', enum: ['Forbidden'] },
      },
    },
  })
  @UseGuards(AuthGuard, AdminGuard)
  @Get('/sync')
  async syncMovies() {
    return await this.moviesService.syncData();
  }
  @ApiOkResponse({ type: MovieDTO })
  @ApiUnauthorizedResponse({
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', enum: [401] },
        message: { type: 'string', enum: ['Unauthorized'] },
      },
    },
  })
  @UseGuards(AuthGuard)
  @Get('/:id')
  async getOne(@Param() params: ObjectIdParam) {
    return await this.moviesService.getOne(params.id);
  }

  @ApiOkResponse({
    type: MovieDTO,
  })
  @ApiUnauthorizedResponse({
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', enum: [401] },
        message: { type: 'string', enum: ['Unauthorized'] },
      },
    },
  })
  @ApiForbiddenResponse({
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        status: { type: 'number', enum: [403] },
        error: { type: 'string', enum: ['Forbidden'] },
      },
    },
  })
  @UseGuards(AuthGuard, AdminGuard)
  @Put('/:id')
  async updateOne(
    @Param() params: ObjectIdParam,
    @Body() data: Partial<CreateMovieDTO>,
  ): Promise<MovieDTO> {
    return await this.moviesService.updateOne(params.id, data);
  }

  @ApiNoContentResponse()
  @ApiUnauthorizedResponse({
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', enum: [401] },
        message: { type: 'string', enum: ['Unauthorized'] },
      },
    },
  })
  @ApiForbiddenResponse({
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        status: { type: 'number', enum: [403] },
        error: { type: 'string', enum: ['Forbidden'] },
      },
    },
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard, AdminGuard)
  @Delete('/:id')
  async deleteOne(@Param() params: ObjectIdParam): Promise<void> {
    return await this.moviesService.deleteOne(params.id);
  }
}
