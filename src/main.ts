import 'dotenv/config'; 
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Filtro global para tratamento de erros
  const { AllExceptionsFilter } = await import(
    './filters/all-exceptions.filter'
  );
  app.useGlobalFilters(new AllExceptionsFilter());

  // 🔥 Validação global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
    }),
  );

  // 🔓 CORS —
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://javascript-full-stack-front-end.vercel.app',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false,
  });

  const PORT = process.env.PORT || 3001;

  await app.listen(PORT, () => {
    console.log(`🚀 Backend rodando na porta ${PORT}`);
  });
}

bootstrap();
