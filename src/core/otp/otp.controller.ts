import { Body, Controller, Get, Post } from '@nestjs/common';
import { OtpService } from './otp.service';
import { OtpVerifierDto } from './dto/otp.verification';

@Controller('Otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post('/verifyOtp')
  verify(@Body() otpVeriferDto: OtpVerifierDto) {
    return this.otpService.OtpVerification(otpVeriferDto);
  }
}
