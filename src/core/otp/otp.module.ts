import { Module } from '@nestjs/common';
import { MailService } from '../mail/mail.service';
import { OtpService } from './otp.service';

@Module({
  imports: [MailService],
  controllers: [],
  providers: [OtpService],
  exports: [OtpService]
})
export class MailModule {}
