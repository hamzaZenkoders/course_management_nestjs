// Importing built-in methods
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  BadRequestException, // Add this import
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Importing DTOs
import { CreateStudentDto } from './dto/create-student.dto';
// import { UpdateStudentDto } from './dto/update-student.dto';

// Importing bcrypt
import * as bcrypt from 'bcrypt';

// Importing entities
import { OTP } from 'src/core/otp/entity/otp.entity';
import { Student } from './entities/student.entity';

// Importing services
import { MailService } from 'src/core/mail/mail.service';

// Importing external package
import { otpGen } from 'otp-gen-agent';
import { OtpService } from 'src/core/otp/otp.service';
import { OtpVerifierDto } from 'src/core/otp/dto/otp.verification';
import { OtpPurpose } from '../enums/otpEnum';
import { LoginInStudentDto } from './dto/login-student-dto';
import { JwtService } from '@nestjs/jwt';
import { CreateEnrollmentDto } from '../enrollment/dto/create-enrollment-dto';
import { CourseService } from '../course/course.service';
import { Course } from '../course/entities/course.entity';
import { PaginationSearchDto } from '../admin/dto/paginationSearch-dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  //getiing student all enrolled courses
  async studentAllEnrolledCourses(student_id: number) {
    const studentWithCourses = await this.studentRepository
      .createQueryBuilder('student')
      .leftJoinAndSelect('student.enrollments', 'enrollment')
      .leftJoinAndSelect('enrollment.course', 'course')
      .where('student.id = :id', { id: student_id })
      .getMany();

    return studentWithCourses;
  }

  //updating student profile
  async updateStudentProfile(id: number, updatingData: Object) {
    const tempData = await this.studentData(id);

    if (!tempData) {
      throw new NotFoundException();
    }

    const updatedStudent = { ...tempData, ...updatingData };

    console.log(updatedStudent);

    const result = await this.studentRepository.update(id, updatedStudent);

    if (result.affected > 0) {
      return {
        statusCode: HttpStatus.OK,
        message: 'Student profile updated successfully',
      };
    } else {
      throw new HttpException(
        'Failed to update student profile',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //getting student data
  async studentData(id: number) {
    const student = await this.studentRepository.findOne({ where: { id } });

    if (!student) {
      throw new NotFoundException();
    }
    return student;
  }

  //all students using pagination
  async getAllStudents(paginationSearchDto: PaginationSearchDto) {
    console.log(paginationSearchDto);
    try {
      let { page, limit, search } = paginationSearchDto;

      if (!page || !limit) {
        page = 1;
        limit = 3;
      }
      const query = this.studentRepository.createQueryBuilder('student');

      if (search) {
        query.where(
          'student.username ILIKE :search OR student.email ILIKE :search',
          { search: `%${search}%`.toLowerCase() },
        );
      }

      const [result, total] = await query
        .skip((page - 1) * limit)
        .take(limit)
        .getManyAndCount();

      return {
        data: result,
        count: total,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateIsVerifiedStatus(
    studentId: number,
    is_Verified: boolean,
  ): Promise<void> {
    await this.studentRepository.update(studentId, { is_Verified });
  }

  async findOne(email: string): Promise<Student | undefined> {
    return await this.studentRepository.findOne({ where: { email } });
  }

  async findByID(id: number): Promise<Student | undefined> {
    return await this.studentRepository.findOne({ where: { id } });
  }
  async findAll() {
    const allStudentResult = await this.studentRepository.find();
    return allStudentResult;
  }
}
