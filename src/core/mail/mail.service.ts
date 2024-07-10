import { Inject, Injectable } from '@nestjs/common';
import { otpGen } from 'otp-gen-agent';

@Injectable()
export class MailService {
  constructor(@Inject('MAIL_TRANSPORTER') private readonly transporter: any) {}

  async sendEmailOtp(email: string, otp: number) {
    //

    const info = await this.transporter.sendMail({
      from: '"Otp verifier " <hamza.zenkoders@gmail.com>', // sender address
      to: email, // list of receivers
      subject: 'Otp Verification ✔', // Subject line
      text: 'Please enter the otp to register', // plain text body
      html: `<p>Your otp code is <b>${otp}<b></p><br><br><br><br>
           <b> NOTE: Do not share this code with anyone </b>`, // html body
    });

    console.log('Message sent: %s', info.messageId);

    return info;
  }

  async sendCourseEmail(email: string, courseName: string) {
    //

    const info = await this.transporter.sendMail({
      from: '"ZenAcademy " <hamza.zenkoders@gmail.com>', // sender address
      to: email, // list of receivers
      subject: 'Course Payment Successful ✔', // Subject line
      // text: 'Please enter the otp to register', // plain text body
      html: `<p>You have successfully purchased <b>${courseName}</b></p><br><br><br><br>`, // html body
    });

    console.log('Message sent: %s', info.messageId);

    return info;
  }

  async sendFailedTransactionEmail(email: string) {
    //

    const info = await this.transporter.sendMail({
      from: '"ZenAcademy " <hamza.zenkoders@gmail.com>', // sender address
      to: email, // list of receivers
      subject: 'Course Payment Unsuccessful ', // Subject line

      html: `<p>Unfortunately, the transaction did not succeed, resulting in no purchase of the course.</p>`, // html body
    });

    console.log('Message sent: %s', info.messageId);

    return info;
  }
}
