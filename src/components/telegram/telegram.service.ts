import { Injectable } from '@nestjs/common';
const TelegramBot = require('node-telegram-bot-api');

@Injectable()
export class TelegramService {
  private bot: any;

  constructor() {
    const token = process.env.TELEGRAM_BOT_TOKEN; // Store the token in environment variable
    this.bot = new TelegramBot(token, { polling: true });
    this.bot.on('message', this.onReceiveMessage);
  }

  onReceiveMessage = (msg: any) => {
    const chatId = msg.chat.id;
    console.log('msg==', msg);
    this.sendMessage(chatId, 'Hello from Telegram Mini App!');
  };
  // Method to send a custom message
  sendMessage(chatId: number, text: string) {
    this.bot.sendMessage(chatId, text);
    return {
      message: 'Message sent successfully',
      data: {},
    };
  }
}
