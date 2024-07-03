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
  Query,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { RoleAuthorizationGuard } from 'src/core/guards/roleAuthorization.guard';
import { AuthenticationGuard } from 'src/core/guards/authentication.guard';
import { Role } from 'src/core/decorator/roles.decorator';
import { PaginationSearchDto } from '../admin/dto/paginationSearch-dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

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

  //update profile
  @Role('STUDENT')
  @UseGuards(AuthenticationGuard, RoleAuthorizationGuard)
  @Patch('updateProfile/:id')
  UpdateProfile(@Param('id') id: number, @Req() request: Request) {
    const data = request.body;
    return this.studentService.updateStudentProfile(id, data);
  }

  //view all students

  @Role('ADMIN', 'STUDENT')
  @UseGuards(AuthenticationGuard, RoleAuthorizationGuard)
  @Get()
  GetAllStudents(@Query() paginationSearchDto: PaginationSearchDto) {
    return this.studentService.getAllStudents(paginationSearchDto);
  }
}
