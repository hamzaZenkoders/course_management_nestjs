import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EmailAuthorizationGuard } from '../guards/emailAuthorization.guard';
import { CreateStudentDto } from 'src/features/student/dto/create-student.dto';
import { LoginInStudentDto } from 'src/features/student/dto/login-student-dto';
import { CreateTeacherDto } from 'src/features/teacher/dto/create-teacher.dto';
import { LoginInTeacherDto } from 'src/features/teacher/dto/login-teacher-dto';
import { CreateAdminDto } from 'src/features/admin/dto/create-admin.dto';
import { LoginInAdminDto } from 'src/features/admin/dto/login-admin-dto';

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

  @Post('/teacher/signup')
  @UseGuards(EmailAuthorizationGuard)
  TeacherSignUp(@Body() createTeacherDto: CreateTeacherDto) {
    return this.authService.registerTeacher(createTeacherDto);
  }

  @Post('/teacher/login')
  @UseGuards(EmailAuthorizationGuard)
  TeacherSignIn(@Body() loginTeacherDto: LoginInTeacherDto) {
    return this.authService.signInTeacher(loginTeacherDto);
  }

  @Post('/admin/signup')
  @UseGuards(EmailAuthorizationGuard)
  AdminSignUp(@Body() createAdminDto: CreateAdminDto) {
    return this.authService.registerAdmin(createAdminDto);
  }

  @Post('/admin/login')
  @UseGuards(EmailAuthorizationGuard)
  AdminSignIn(@Body() loginAdminDto: LoginInAdminDto) {
    return this.authService.signInAdmin(loginAdminDto);
  }
}
