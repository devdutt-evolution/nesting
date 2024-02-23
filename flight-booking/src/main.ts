import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // swagger config
  const config = new DocumentBuilder()
    .addBearerAuth()
    .addServer('http://localhost:3000/', 'Local server')
    .setTitle('Flight Booking apis')
    .setDescription('Flight Booking apis provided for testing')
    .build();
  // building swagger doc
  const doc = SwaggerModule.createDocument(app, config);
  // settingup path
  SwaggerModule.setup('docs', app, doc);

  await app.listen(3000);
}
bootstrap();
