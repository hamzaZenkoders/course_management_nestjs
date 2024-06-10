import { Controller, Get } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get()
  async getEmail() {
   // const hold = await this.mailService.sendEmailOtp(
     // 'm.hamza.siddiqui100@gmail.com',
    //);
    //console.log(hold);
    return 'Email sent successfully';
  }
}
