import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { transporter } from './mailer.config';
import { MailService } from './mail.service';
import { OtpService } from '../otp/otp.service';
import { OtpModule } from '../otp/otp.module';

@Module({
  imports: [MailModule],
  controllers: [MailController],
  providers: [
    {
      provide: 'MAIL_TRANSPORTER',
      useValue: transporter,
    },
    MailService,
  ],
  exports: ['MAIL_TRANSPORTER', MailService],
})
export class MailModule {}
