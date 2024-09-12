import { Module } from '@nestjs/common';
import { SharedController } from './shared.controller';
import { ResponseService } from './services/response.service';

@Module({
  providers: [ResponseService],
  controllers: [SharedController],
  exports: [ResponseService],
})
export class SharedModule {}
