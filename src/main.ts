import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors();
  const config = new DocumentBuilder()
  .setTitle('Documentasion Clinic Ai')
  .setDescription('Clinic api Ai documentasion')
  .setVersion('1.0')
  .addTag('api')
  .addSecurity('bearer', {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    name: 'JWT',
    description: 'Enter JWT token',
    in: 'header',
  })
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-swagger', app, document);
  await app.listen(3000);
}
bootstrap().catch(err => console.error('Bootstrap error:', err));
