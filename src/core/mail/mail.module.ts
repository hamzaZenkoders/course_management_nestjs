import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { transporter } from './mailer.config';
import { MailService } from './mail.service';

@Module({
  imports: [],
  controllers: [MailController],
  providers: [
    {
      provide: 'MAIL_TRANSPORTER', 
      useValue: transporter,
    },
    MailService,
  ],
  exports: [MailService]
})
export class MailModule {}
