import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  //testing
  app.useGlobalPipes(new ValidationPipe({ skipMissingProperties: false }));
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });
  const config = new DocumentBuilder()
    .setTitle('Rock Paper Scissor Backend')
    .setDescription('Rock Paper Scissor Backend APIs')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'authorization', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  console.log('Listening on port ', process.env.PORT || 8080);
  await app.listen(process.env.PORT || 8080);
}
bootstrap();
