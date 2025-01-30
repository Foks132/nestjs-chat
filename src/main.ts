import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const configService = new ConfigService();
  const configSwagger = new DocumentBuilder()
    .setTitle('Chat API')
    .setDescription('API documentation (REST & WebSocket)')
    .setVersion('1.0')
    .build();
  SwaggerModule.setup(
    'api',
    app,
    SwaggerModule.createDocument(app, configSwagger),
  );
  await app.listen(configService.get('APP_PORT') ?? 3000);
}
bootstrap();
