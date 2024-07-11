import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Role } from 'src/core/decorator/roles.decorator';
import { AuthenticationGuard } from 'src/core/guards/authentication.guard';
import { RoleAuthorizationGuard } from 'src/core/guards/roleAuthorization.guard';
import { StripeService } from 'src/core/stripe/stripe.service';
import CustomRequest from './req.interface';

@Controller('course')
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    private readonly stripeService: StripeService,
  ) {}

  // Create Course
  @Role('TEACHER')
  @UseGuards(AuthenticationGuard, RoleAuthorizationGuard)
  @Post('/createCourse')
  create(@Body() createCourseDto: CreateCourseDto) {
    console.log(createCourseDto);
    return this.courseService.create(createCourseDto);
  }

  //Get all courses

  @Role('TEACHER', 'ADMIN')
  @UseGuards(AuthenticationGuard, RoleAuthorizationGuard)
  @Get()
  GetAllCourses() {
    return this.courseService.findAll();
  }

  //update course      ROUTE /update?courseID=1

  @Role('TEACHER')
  @UseGuards(AuthenticationGuard, RoleAuthorizationGuard)
  @Patch('/update')
  UpdateCourse(@Query('courseID') courseId: string, @Req() request: Request) {
    const data = request.body;
    console.log(+courseId);
    // return 'working';
    return this.courseService.updateCourseContent(+courseId, data);
  }

  //delete course
  @Role('TEACHER')
  @UseGuards(AuthenticationGuard, RoleAuthorizationGuard)
  @Delete(':id')
  removeCourse(@Param('id') id: string) {
    return this.courseService.deleteCourse(+id);
  }

  //buyCourse

  @Role('STUDENT')
  @UseGuards(AuthenticationGuard, RoleAuthorizationGuard)
  @Post(':courseId/purchase')
  async purchaseCourse(
    @Param('courseId') courseId: string,
    @Body('price') price: number,
    @Req() req: CustomRequest,
  ) {
    const student = req.user;

    const sessionHold = await this.courseService.buyPaidCourse(
      courseId,
      student.id,
      student.email,
      price,
    );

    console.log('sessionnnnnnnnnnnnnnnnn', sessionHold);
    return { sessionHold, sessionUrl: sessionHold.url };
    // return 'working';
  }

  @Get('/aaaaa')
  check() {
    console.log(process.env.DATABASE_PASSWORD);
    return 'working';
  }
}
///
