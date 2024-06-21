import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EmailAuthorizationGuard } from '../guards/emailAuthorization.guard';
import { CreateStudentDto } from 'src/features/student/dto/create-student.dto';
import { LoginInStudentDto } from 'src/features/student/dto/login-student-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/student/signup')
  @UseGuards(EmailAuthorizationGuard)
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.authService.register(createStudentDto);
  }

  @Post('/student/login')
  signIn(@Body() loginInStudentDto: LoginInStudentDto) {
    return this.authService.login(loginInStudentDto);
  }

  /* @Post('/verifyOtp')
  verify(@Body() otpVeriferDto: OtpVerifierDto) {
    //return this.otpService.OtpVerification(otpVeriferDto);
  }
} */
}
