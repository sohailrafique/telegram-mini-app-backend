import { Injectable } from '@nestjs/common';
const TelegramBot = require('node-telegram-bot-api');

@Injectable()
export class TelegramService {
  private bot: any;

  constructor() {
    console.log('token==', process.env.TELEGRAM_BOT_TOKEN);
    const token = process.env.TELEGRAM_BOT_TOKEN; // Store the token in environment variable
    this.bot = new TelegramBot(token, { polling: true });
    this.bot.on('message', this.onReceiveMessage);
  }

  onReceiveMessage = (msg: any) => {
    const chatId = msg.chat.id;
    this.sendMessage(chatId, 'Hello from Telegram Mini App!');
  };
  // Method to send a custom message
  sendMessage(chatId: number, text: string) {
    this.bot.sendMessage(chatId, text);
  }
}
