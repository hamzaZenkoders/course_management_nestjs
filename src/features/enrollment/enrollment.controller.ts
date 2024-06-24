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
import { EnrollmentService } from './enrollment.service';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { CreateEnrollmentDto } from './dto/create-enrollment-dto';
import { AuthenticationGuard } from 'src/core/guards/authentication.guard';
import { RoleAuthorizationGuard } from 'src/core/guards/roleAuthorization.guard';
import { Role } from 'src/core/decorator/roles.decorator';
import { RemoveEnrollmentDto } from './dto/remove-enrollment-dto';

@Controller('enrollment')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Get()
  findAll() {
    return this.enrollmentService.findAll();
  }

  @Role('STUDENT')
  @UseGuards(AuthenticationGuard, RoleAuthorizationGuard)
  @Post('/create')
  create(@Body() createEnrollmentDto: CreateEnrollmentDto) {
    // const { studentId, courseId } = req.body;
    // const passData = createEnrollmentDto;

    // return 'working fine';

    return this.enrollmentService.creatEnrollment(createEnrollmentDto);
  }

  //drop course enrollment
  @Role('STUDENT')
  @UseGuards(AuthenticationGuard, RoleAuthorizationGuard)
  @Delete('/drop/:id')
  remove(@Param('id') id: number) {
    //const { enrollmentID } = req.params;
    //  return 'working';
    return this.enrollmentService.removeEnrollment(id);
  }

  /*  //get student all enrolled courses
  @Role('STUDENT')
  @UseGuards(AuthenticationGuard, RoleAuthorizationGuard)
  @Get('/EnrolledCourses/:id')
  AllEnrolledCourses(@Param('id') id: number) {
    return this.enrollmentService.studentAllEnrolledCourses(+id);
  } */

  @Role('TEACHER')
  @UseGuards(AuthenticationGuard, RoleAuthorizationGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.enrollmentService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEnrollmentDto: UpdateEnrollmentDto,
  ) {
    return this.enrollmentService.update(+id, updateEnrollmentDto);
  }
}
