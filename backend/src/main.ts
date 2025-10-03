import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for the frontend application
  app.enableCors({
    origin: 'http://localhost:3000', // Or your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Use global pipes for DTO validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Automatically remove non-whitelisted properties
    forbidNonWhitelisted: true, // Throw an error if non-whitelisted properties are provided
    transform: true, // Automatically transform payloads to be objects typed according to their DTO classes
  }));

  // Start the application on port 3001
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();