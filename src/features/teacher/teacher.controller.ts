import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { TeacherService } from './teacher.service';

import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Role } from 'src/core/decorator/roles.decorator';
import { AuthenticationGuard } from 'src/core/guards/authentication.guard';
import { RoleAuthorizationGuard } from 'src/core/guards/roleAuthorization.guard';
import { PaginationSearchDto } from '../admin/dto/paginationSearch-dto';

interface TeacherQueryParams {
  teacher_id: string;
  course_id: string;
}

@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  //Get teacher profile
  @Role('TEACHER')
  @UseGuards(AuthenticationGuard, RoleAuthorizationGuard)
  @Get(':id')
  GetTeacherProfile(@Param('id') id: number) {
    return this.teacherService.TeacherData(+id);
  }

  //update teacher profile
  @Role('TEACHER')
  @UseGuards(AuthenticationGuard, RoleAuthorizationGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
    return this.teacherService.updateTeacherProfile(+id, updateTeacherDto);
  }

  //teacher can see student in enrolled course

  //@Role('TEACHER')
  //@UseGuards(AuthenticationGuard, RoleAuthorizationGuard)
  @Get('/studentsEnroll') //http://localhost:3000/studentsEnrolled?teacher_id=1&course_id=2
  getTeacherCourseStudents(@Query() query: TeacherQueryParams) {
    console.log(query.course_id);
    return 'workings';
  }

  //view all teachers

  @Role('ADMIN')
  @UseGuards(AuthenticationGuard, RoleAuthorizationGuard)
  @Get('/allteachers')
  GetAllTeacher(@Query() paginationSearchDto: PaginationSearchDto) {
    return this.teacherService.findAllTeachers(paginationSearchDto);
  }
}
