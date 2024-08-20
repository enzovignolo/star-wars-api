import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PaginatedResponse } from './common/dto/pagination.dto';
import { MovieDTO } from './controllers/movies/dto/get-movies.dto';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //register swagger module to app
  const config = new DocumentBuilder()
    .setTitle('Star Wars API')
    .setDescription('The API of Star Wars Movies')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [PaginatedResponse, MovieDTO],
  });
  SwaggerModule.setup('api', app, document);
  //
  //add validation pipeline
  app.useGlobalPipes(new ValidationPipe());
  //
  await app.listen(process.env.PORT);
  console.log(`[OK] API RUNNING ON PORT ${process.env.PORT}`);
  process.on('unhandledRejection', (error, promise) => {
    console.log('Unhandled rejection at ', promise, `reason: ${error}`);
  });
}
bootstrap();
