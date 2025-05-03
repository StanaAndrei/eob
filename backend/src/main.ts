import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import morgan from 'morgan';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    credentials: false,
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  });
  app.use(morgan('tiny'));
  app.use(helmet());
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('<UNK>')
    .setDescription('<UNK>')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'Authorization',
      in: 'header',
    }, 'access-token').build();
  const docFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, docFactory);

  await app.listen(3001);
  console.log('WORKS');
}
bootstrap().then(_ => {});
