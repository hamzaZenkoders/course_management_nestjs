import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { transporter } from './mailer.config';
//import { TypeOrmModule } from '@nestjs/typeorm';
import { MailService } from './mail.service';

@Module({
  imports: [],
  controllers: [MailController],
  providers: [
    {
      provide: 'MAIL_TRANSPORTER', // Unique identifier
      useValue: transporter,
    },
    MailService,
  ],
})
export class MailModule {}
