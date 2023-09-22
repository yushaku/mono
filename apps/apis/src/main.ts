import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { APP_PORT = 8005 } = process.env;

  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.enableCors({
    origin: true,
    credentials: true,
    exposedHeaders: ['set-cookie'],
  });

  app.enableShutdownHooks();
  await app.listen(APP_PORT);
  Logger.log(`🚀 Application is running on: http://localhost:${APP_PORT}`);
}

bootstrap();
