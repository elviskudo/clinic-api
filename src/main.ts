import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { CustomValidationPipe } from './custom-validation.pipe';
import { CustomExceptionFilter } from './custom.exptesion';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new CustomValidationPipe({
  //   whitelist: true,
  //   forbidNonWhitelisted: true,
  //   transform: true,
  // }));
  // app.useGlobalFilters(new CustomExceptionFilter());
  await app.listen(3000);
}
bootstrap();
