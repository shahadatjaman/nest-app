import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  
  getLove(): string {
    return 'I 💗 Bangladesh!';
  }

  login() : string {
    return '🙋‍♂️ I`m login route.'
  }
}
