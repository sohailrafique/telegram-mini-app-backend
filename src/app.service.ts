import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    console.log('hello world console');
    return {
      message: 'Hello World!',
    };
  }
}
