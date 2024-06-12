import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { CourseService } from '../course/course.service';
import { StudentService } from '../student/student.service';
import { CreateEnrollmentDto } from './dto/create-enrollment-dto';
import { Enrollment } from './entities/enrollment.entity';
import { EnrollmentStatus } from '../enums/enrollmentStatus';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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

  findOne(id: number) {
    return `This action returns a #${id} enrollment`;
  }

  update(id: number, updateEnrollmentDto: UpdateEnrollmentDto) {
    return `This action updates a #${id} enrollment`;
  }

  remove(id: number) {
    return `This action removes a #${id} enrollment`;
  }

  async creatEnrollment(createEnrollmentDto: CreateEnrollmentDto) {
    const foundCourse = await this.courseService.findOne(
      createEnrollmentDto.courseId,
    );

    if (!foundCourse) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }

    /*  const studentFound = await this.studentService.findByID(
      createEnrollmentDto.studentId,
    );

    if (!studentFound) {
      throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
    } */

    const newEnrollment = this.enrollmentRepository.create({
      ...createEnrollmentDto,
      // studentId: createEnrollmentDto.studentId,
      // courseId: createEnrollmentDto.courseId,
    });

    const enrollmentSaved = this.enrollmentRepository.save(newEnrollment);

    return enrollmentSaved; //
  }
}
