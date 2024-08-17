import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //register swagger module to app
  const config = new DocumentBuilder()
    .setTitle('Star Wars API')
    .setDescription('The API of Star Wars Movies')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT);
  console.log(`[OK] API RUNNING ON PORT ${process.env.PORT}`);
  process.on('unhandledRejection', (error, promise) => {
    console.log('Unhandled rejection at ', promise, `reason: ${error}`);
  });
}
bootstrap();
