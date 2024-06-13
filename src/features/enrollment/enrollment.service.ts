import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { CourseService } from '../course/course.service';
import { StudentService } from '../student/student.service';
import { CreateEnrollmentDto } from './dto/create-enrollment-dto';
import { Enrollment } from './entities/enrollment.entity';
import { EnrollmentStatus } from '../enums/enrollmentStatus';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RemoveEnrollmentDto } from './dto/remove-enrollment-dto';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectRepository(Enrollment)
    private enrollmentRepository: Repository<Enrollment>,

    private courseService: CourseService,
    private studentService: StudentService,
  ) {}

  create(createEnrollmentDto: CreateEnrollmentDto) {
    return 'This action adds a new enrollment';
  }

  findAll() {
    return `This action returns all enrollment`;
  }
  /* 
  findOne(id: number) {
    return `This action returns a #${id} enrollment`;
  } */

  update(id: number, updateEnrollmentDto: UpdateEnrollmentDto) {
    return `This action updates a #${id} enrollment`;
  }

  remove(id: number) {
    return `This action removes a #${id} enrollment`;
  }

  async creatEnrollment(createEnrollmentDto: CreateEnrollmentDto) {
    console.log(createEnrollmentDto);
    console.log(createEnrollmentDto.courseID);

    const foundCourse = await this.courseService.findOne(
      createEnrollmentDto.courseID,
    );

    //console.log(foundCourse);
    // console.log('IDDD', createEnrollmentDto.courseID);

    if (!foundCourse) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }

    const studentFound = await this.studentService.findByID(
      createEnrollmentDto.studentId,
    );

    if (!studentFound) {
      throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
    }

    const newEnrollment = this.enrollmentRepository.create({
      ...createEnrollmentDto,
      student: studentFound,
      course: foundCourse,
    });

    const enrollmentSaved = this.enrollmentRepository.save(newEnrollment);

    return enrollmentSaved;
  }

  async removeEnrollment(enrollmentID: number) {
    const foundEnrollment = await this.findOne(enrollmentID);

    console.log(foundEnrollment.course.dropDeadline);
    console.log(new Date(Date.now()));

    const dropDeadlineUTC = new Date(foundEnrollment.course.dropDeadline);
    const currentDateTimeUTC = new Date();

    if (currentDateTimeUTC > dropDeadlineUTC) {
      throw new HttpException(
        'Course dropped deadline has already passed',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async findOne(id: number) {
    const result = await this.enrollmentRepository.findOne({
      where: { id },
      relations: ['student', 'course'],
    });
    return result;
  }
}
