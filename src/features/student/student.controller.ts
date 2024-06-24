import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { AuthGuard } from '@nestjs/passport';
import { EmailAuthorizationGuard } from 'src/core/guards/emailAuthorization.guard';
import { whiteListDomain } from 'src/core/entities/whitlistedDomain.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginInStudentDto } from './dto/login-student-dto';
import { RoleAuthorizationGuard } from 'src/core/guards/roleAuthorization.guard';
import { AuthenticationGuard } from 'src/core/guards/authentication.guard';
import { Role } from 'src/core/decorator/roles.decorator';
//import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}
  /* 
  @Post('/auth/signup')
  @UseGuards(EmailAuthorizationGuard)
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.register(createStudentDto);
  }

  @Post('/auth/login')
  signIn(@Body() loginInStudentDto: LoginInStudentDto) {
    return this.studentService.login(loginInStudentDto);
  } */

  //get student profile
  @Role('STUDENT')
  @UseGuards(AuthenticationGuard, RoleAuthorizationGuard)
  @Get('/:id')
  GetStudentProfile(@Param('id') id: number) {
    return this.studentService.studentData(+id);
  }

  //get student all enrolled courses
  @Role('STUDENT')
  @UseGuards(AuthenticationGuard, RoleAuthorizationGuard)
  @Get('/EnrolledCourses/:id')
  AllEnrolledCourses(@Param('id') id: number) {
    return this.studentService.studentAllEnrolledCourses(+id);
  }
  //VIEW ALL COURES

  @Post('/enrollment')
  EnrollInCourse() {
    return 'working correctly';
  }

  //update profile
  @Role('STUDENT')
  @UseGuards(AuthenticationGuard, RoleAuthorizationGuard)
  @Patch('updateProfile/:id')
  UpdateProfile(@Param('id') id: number, @Req() request: Request) {
    const data = request.body;
    return this.studentService.updateStudentProfile(id, data);
  }

  //view all students

  @Role('ADMIN')
  @UseGuards(AuthenticationGuard, RoleAuthorizationGuard)
  @Get()
  GetAllStudents() {
    return this.studentService.findAll();
  }

  /* @Get('/second')
  getDataTwo(@Body() createStudentDto: CreateStudentDto) {
    // console.log('checkkk');
    return this.studentService.findOne(createStudentDto.email);
  } */
}
