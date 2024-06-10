import { Inject, Injectable } from '@nestjs/common';
import { otpGen } from 'otp-gen-agent';

@Injectable()
export class MailService {
  constructor(@Inject('MAIL_TRANSPORTER') private readonly transporter: any) {}

  async sendEmailOtp(email: string) {
    const otp = await otpGen();

    const info = await this.transporter.sendMail({
      from: '"Maddison Foo Koch 👻" <hamza.zenkoders@gmail.com>', // sender address
      to: email, // list of receivers
      subject: 'Otp Verification ✔', // Subject line
      text: 'Please enter the otp to register', // plain text body
      html: `<b>Your otp code is ${otp}</b>`, // html body
    });

    console.log('Message sent: %s', info.messageId);

    return info;
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }
}
