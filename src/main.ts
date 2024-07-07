import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { CustomValidationPipe } from './custom-validation.pipe';
import { CustomExceptionFilter } from './custom.exptesion';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
