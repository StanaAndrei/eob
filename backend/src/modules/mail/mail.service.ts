import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendEmail(
    to: string,
    subject: string,
    template: string,
    context: any,
  ): Promise<void> {
    console.log('mail:', to, subject, template, context);
    if (process.env.NODE_ENV === 'dev') {
      return;
    }
    //await this.mailerService.sendMail({ to, subject, template, context });
  }
}
