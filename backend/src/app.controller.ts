import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MailService } from './modules/mail/mail.service';
import { AllowAnon } from './modules/auth/auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private mailService: MailService,
  ) {}

  @Get()
  @AllowAnon()
  async getHello() {
    //return this.appService.getHello();
    await this.mailService.sendEmail(
      'stadey33@gmail.com',
      'test',
      './details',
      {
        tmpPass: 'lalalala',
      },
    );//*/
  }
}
