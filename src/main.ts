import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// import fastyfyMultipart from '@fastify/multipart';
import multipart from 'fastify-multipart';

const fastifyMultipart = require('fastify-multipart');

const fmp = require('fastify-multipart');

const config = new DocumentBuilder()
  .setTitle('Store')
  .setDescription(':)')
  .setVersion('1.0')
  .addTag('')
  .build();

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.register(fastifyMultipart);
  // app.register(multipart as any);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(morgan('dev'));

  SwaggerModule.setup('api', app, SwaggerModule.createDocument(app, config));

  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PATCH', 'PUT'],
    credentials: true,
  });

  await app.listen(8000);
}

bootstrap();
