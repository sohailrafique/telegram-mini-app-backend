import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // // Global validation pipe
  // app.useGlobalPipes(new ValidationPipe({ skipMissingProperties: false }));

  // // Set global prefix for APIs
  // app.setGlobalPrefix('api');

  // // Enable versioning for your APIs
  // app.enableVersioning({
  //   type: VersioningType.URI,
  // });

  // Return the app instance instead of calling listen()
  // return app.init();
  await app.listen(process.env.PORT || 8080);
}

// Export the function as default for Vercel to invoke
export default bootstrap();
