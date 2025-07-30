import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5174', // Allow your frontend origin
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
