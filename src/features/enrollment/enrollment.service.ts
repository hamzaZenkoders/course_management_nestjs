import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { CourseService } from '../course/course.service';
import { StudentService } from '../student/student.service';
import { CreateEnrollmentDto } from './dto/create-enrollment-dto';
import { Enrollment } from './entities/enrollment.entity';
import { EnrollmentStatus } from '../enums/enrollmentStatus';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//import { RemoveEnrollmentDto } from './dto/remove-enrollment-dto';
import { Student } from '../student/entities/student.entity';
import { PurchaseHistory } from '../purchase-history/entities/purchaseHistor.entity';
import { Course } from '../course/entities/course.entity';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectRepository(Enrollment)
    private enrollmentRepository: Repository<Enrollment>,

    @InjectRepository(Student)
    private studentRepository: Repository<Student>,

    @InjectRepository(PurchaseHistory)
    private purchasehistoryRepository: Repository<PurchaseHistory>,

    @Inject(forwardRef(() => CourseService))
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

  remove(id: number) {
    return `This action removes a #${id} enrollment`;
  }

  async creatEnrollment(createEnrollmentDto: CreateEnrollmentDto) {
    console.log(createEnrollmentDto);
    console.log(createEnrollmentDto.course_id);

    const foundCourse = await this.courseService.findOne(
      createEnrollmentDto.course_id,
    );

    if (!foundCourse) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }

    const studentFound = await this.studentService.findByID(
      createEnrollmentDto.student_id,
    );

    if (!studentFound) {
      throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
    }

    /*   //checking if student has purchased the course
    const isCoursePurchased = await this.checkPurchaseHistory(
      studentFound.id,
      foundCourse.id,
    );

    if (!isCoursePurchased) {
      throw new HttpException(
        'Course is paid,Buy course to register',
        HttpStatus.BAD_REQUEST,
      );
    } */

    const newEnrollment = this.enrollmentRepository.create({
      ...createEnrollmentDto,
      student: { id: createEnrollmentDto.student_id },
      course: foundCourse,
    });

    const enrollmentSaved = this.enrollmentRepository.save(newEnrollment);

    return enrollmentSaved;
  }

  async removeEnrollment(enrollmentID: number) {
    console.log(enrollmentID);
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
    const result = await this.enrollmentRepository.delete({ id: enrollmentID });

    if (result.affected === 0) {
      throw new HttpException('Enrollment not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  /*  async studentAllEnrolledCourses(student_id: number) {
    const studentWithCourses = await this.studentRepository
      .createQueryBuilder('student')
      .leftJoinAndSelect('student.enrollments', 'enrollment')
      .leftJoinAndSelect('enrollment.course', 'course')
      .where('student.id = :id', { id: student_id })
      .getMany();

    return studentWithCourses;
  }
 */

  //to check if a course id exists in enrollments
  async hasEnrollments(courseId: number): Promise<boolean> {
    const enrollment = await this.enrollmentRepository.findOne({
      where: { course: { id: courseId } },
    });
    return !!enrollment;
  }

  //to check purchase history of a student with course

  /*  async checkPurchaseHistory(
    studentID: number,
    courseID: number,
  ): Promise<boolean> {
    const purchase = await this.purchasehistoryRepository.findOne({
      where: {
        student: { id: studentID }, // Assuming `student` is the relationship field in PurchaseHistory entity
        course: { id: courseID }, // Assuming `course` is the relationship field in PurchaseHistory entity
      },
    });

    return !!purchase;
  } */

  async findOne(id: number) {
    const result = await this.enrollmentRepository.findOne({
      where: { id },
      relations: ['student', 'course'],
    });
    return result;
  }
}
