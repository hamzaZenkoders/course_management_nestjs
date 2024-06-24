import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from '../enrollment/entities/enrollment.entity';
import { EnrollmentService } from '../enrollment/enrollment.service';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,

    private enrollmentService: EnrollmentService,
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    const courseExists = await this.courseExists(createCourseDto.name);

    if (courseExists) {
      throw new HttpException('Course already exists', HttpStatus.FORBIDDEN);
    }

    console.log(createCourseDto);

    const newCourse = this.courseRepository.create({
      ...createCourseDto,
      createdAt: new Date(Date.now()),
    }); //

    const savedCourse = await this.courseRepository.save(newCourse);

    return savedCourse;
  }

  async updateCourseContent(courseID: number, Updatingdata: Object) {
    const courseExists = await this.findOne(courseID);

    if (!courseExists) {
      throw new NotFoundException();
    }

    const updatedCourseContent = { ...courseExists, ...Updatingdata };

    const result = await this.courseRepository.update(
      courseID,
      updatedCourseContent,
    );

    if (result.affected > 0) {
      return {
        statusCode: HttpStatus.OK,
        message: 'Course updated successfully',
      };
    } else {
      throw new HttpException(
        'Failed to update course content',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteCourse(id: number) {
    const foundCourse = await this.findOne(id);

    if (!foundCourse) {
      throw new HttpException('Course does not exist', HttpStatus.NOT_FOUND);
    }
    /* 
    //if course deadline is not passed
    const dropDeadlineUTC = new Date(foundCourse.dropDeadline);
    const currentDateTimeUTC = new Date();

    if (currentDateTimeUTC > dropDeadlineUTC) {
      throw new HttpException(
        'Cannot delete coCourse dropped deadline has passed',
        HttpStatus.FORBIDDEN,
      );
    }
 */
    console.log(foundCourse);

    const checkCourseEnrollment =
      await this.enrollmentService.hasEnrollments(id);

    if (checkCourseEnrollment === true) {
      throw new HttpException(
        'Cannot delete course, students are enrolled',
        HttpStatus.FORBIDDEN,
      );
    }
    const result = await this.courseRepository.delete({ id });

    if (result.affected === 0) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    } else {
      throw new HttpException('Course deleted', HttpStatus.OK);
    }
  }

  /* async getCoursesWithoutEnrollments(courseId: number) {
    const courses = await this.courseRepository
      .createQueryBuilder('course')
      .where('course.id = :courseId', { courseId })
      .andWhere((qb) => {
        const subQuery = qb
          .subQuery()
          .select('1')
          .from(Enrollment, 'enrollment')
          .where('enrollment.course_id = course.id')
          .getQuery();
        return `NOT EXISTS (${subQuery})`;
      })
      .getMany();

    return courses;
  }
 */
  async courseExists(courseName: string): Promise<boolean> {
    const course = await this.courseRepository.findOne({
      where: { name: courseName },
    });
    return !!course;
  }

  async findAll() {
    const allCoursesResult = await this.courseRepository.find();
    return allCoursesResult;
  }

  async findOne(id: number): Promise<Course | undefined> {
    const temp = await this.courseRepository.findOne({ where: { id } });
    console.log('inside corse service', temp);
    return temp;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }
}
