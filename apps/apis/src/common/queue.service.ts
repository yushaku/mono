import { UserEntity } from '@/databases/entities';
import { MailerService } from '@nestjs-modules/mailer';
import { Process } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job } from 'bull';

@Injectable()
export class QueueService {
  constructor(private mailerService: MailerService) {}

  @Process()
  async sendEmail(job: Job<{ user: UserEntity; token: string }>) {
    const { data } = job;
    const { user, token } = data;

    const url = `example.com/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      from: '"Support Team" <support@example.com>',
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './confirmation', // `.hbs` extension is appended automatically
      context: {
        name: user.name,
        url,
      },
    });
  }
}
