// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para o frontend da Vercel
  app.enableCors({
    origin: ['https://projeto-encurtador-url-frontend-m6e.vercel.app'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // se você precisar enviar cookies
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();