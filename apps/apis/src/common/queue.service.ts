import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('email')
export class QueueService {
  constructor(private mailerService: MailerService) {}

  @Process()
  async sendConfirmEmail(
    job: Job<{ email: string; token: string; password: string }>,
  ) {
    const { email, token, password } = job.data;
    console.log({ email, token, password });

    const url = `localhost:8005/api/user/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      from: '"Support Team" <support@example.com>',
      subject: 'Invite You into openai my team',
      template: './templates/confirmation',
      context: {
        name: email.split('@')[0],
        email,
        url,
        password,
      },
    });
  }

  // @Process()
  // async sendVerifyEmail(
  //   job: Job<{ email: string; name: string; token: string }>,
  // ) {
  //   const { email, token, name } = job.data;
  //   console.log({ email, token, name });
  //
  //   const url = `localhost:8005/api/user/confirm?token=${token}`;
  //
  //   await this.mailerService.sendMail({
  //     to: email,
  //     from: '"Support Team" <support@example.com>',
  //     subject: 'Welcome to Nice App! Verify your Email',
  //     template: './templates/Verify',
  //     context: { name, email, url },
  //   });
  // }
}
