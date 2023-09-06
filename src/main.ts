import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

console.log(process.env.PORT, 'process.env.PORT');
async function bootstrap() {
  const port = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  await app.listen(port);
}
bootstrap();
