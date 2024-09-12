import { Controller, Post, Body } from '@nestjs/common';
import { TelegramService } from './telegram.service';

@Controller('telegram')
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) {}

  @Post('send-message')
  sendMessage(@Body() body: { chatId: number; message: string }) {
    return this.telegramService.sendMessage(body.chatId, body.message);
  }
}
