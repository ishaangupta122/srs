import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');
  const port = process.env.PORT || 3000;
  const connection = app.get<Connection>(getConnectionToken());

  app.enableCors({
    origin: '*', // Allow all origins
    methods: '*', // Allow all methods
    allowedHeaders: '*', // Allow all headers
    credentials: true, // Allow cookies/auth headers if needed
  });

  await app.listen(port);

  if (connection.readyState === 1) {
    logger.log('📦 MongoDB connected successfully !!');
  } else {
    logger.warn('⚠️ MongoDB not connected yet !!');
  }

  logger.log(`🚀 Application is running on: http://localhost:${port}`);
}
bootstrap();
