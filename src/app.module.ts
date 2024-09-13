import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from './components/shared/shared.module';
import { UserModule } from './components/user/user.module';
import { TelegramModule } from './components/telegram/telegram.module';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionHandler } from './utils/exception.handler';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: false, // This should always be false, if you want to add , then please do through migration
      logging: false,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([]),
    SharedModule,
    UserModule,
    TelegramModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: ExceptionHandler,
    },
  ],
})
export class AppModule {}
