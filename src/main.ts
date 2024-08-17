import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log(`[OK] API RUNNING ON PORT ${process.env.PORT}`);
  process.on('unhandledRejection', (error, promise) => {
    console.log('Unhandled rejection at ', promise, `reason: ${error}`);
  });
}
bootstrap();
