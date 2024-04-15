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
    console.log('====================================');
    console.log();
    console.log('====================================');
    console.log('mail:', to, subject, template, context);
    await this.mailerService.sendMail({ to, subject, template, context });
  }
}
