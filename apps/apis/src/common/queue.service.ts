import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('email')
export class QueueService {
  constructor(private mailerService: MailerService) {}

  @Process()
  async sendEmail(
    job: Job<{ email: string; token: string; password: string }>,
  ) {
    const { data } = job;
    const { email, token, password } = data;
    console.log({ email, token, password });

    const url = `localhost:8005/api/user/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      from: '"Support Team" <support@example.com>',
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './confirmation',
      context: {
        name: email.split('@')[0],
        email,
        url,
        password,
      },
    });
  }
}
