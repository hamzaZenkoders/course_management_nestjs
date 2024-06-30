//importing built in methods

import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//importing DTOs

import { CreateStudentDto } from './dto/create-student.dto'; //
//import { UpdateStudentDto } from './dto/update-student.dto';

//importing bycrypt

import * as bcrypt from 'bcrypt';

//importing entities

import { OTP } from 'src/core/otp/entity/otp.entity';
import { Student } from './entities/student.entity';

//importing services
import { MailService } from 'src/core/mail/mail.service';

//importing external package
import { otpGen } from 'otp-gen-agent';
import { OtpService } from 'src/core/otp/otp.service';
import { OtpVerifierDto } from 'src/core/otp/dto/otp.verification';
import { OtpPurpose } from '../enums/otpEnum';
import { LoginInStudentDto } from './dto/login-student-dto';
import { JwtService } from '@nestjs/jwt';
import { CreateEnrollmentDto } from '../enrollment/dto/create-enrollment-dto';
import { CourseService } from '../course/course.service';
import { Course } from '../course/entities/course.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,

    // @InjectRepository(OTP)
    //  private otpRepository: Repository<OTP>,

    /*  @InjectRepository(Course)
    private courseRepository: Repository<Course>, */

    // private readonly mailService: MailService,
    // private readonly otpService: OtpService,
    //private jwtService: JwtService,
    //private courseService: CourseService,
  ) {}

  /* async register(createStudentDto: CreateStudentDto) {
    //finding is student already exists
    const existingUser = await this.studentRepository.findOne({
      where: { email: createStudentDto.email },
    });

    console.log('check env', process.env.Sender_Email);
    if (existingUser) {
      throw new HttpException('Student already exists', HttpStatus.FORBIDDEN);
    }

    console.log(createStudentDto);
    const hashedPassword = await bcrypt.hash(createStudentDto.password, 10);

    const newStudent = this.studentRepository.create({
      ...createStudentDto,
      createdAt: new Date(Date.now()),
      password: hashedPassword,
    }); //

    // to make sure id comes on top
    const tempSave = { id: newStudent.id, ...newStudent };

    //saving to database
    const savedStudent = await this.studentRepository.save(tempSave);

    //generating otp
    const otpRecieved = await this.otpService.generateOTP();
    //  const encryptedOtp = await bcrypt.hash(otpRecieved,10);

    if (savedStudent.is_Verified === false) {
      //saving Otp in the otp table
      await this.otpService.saveOtp(savedStudent.id, otpRecieved);

      //sending otp
      await this.mailService.sendEmailOtp(tempSave.email, otpRecieved); //
      return {
        statusCode: HttpStatus.OK,
        message: 'Verification otp is sent to email',
      };
    } else {
      console.log('Student is verified:', savedStudent);

      return savedStudent;
    }
  }

  async login(loginInStudentDto: LoginInStudentDto) {
    const StudentFound = await this.studentRepository.findOne({
      where: { email: loginInStudentDto.email },
    });

    if (!StudentFound) {
      throw new NotFoundException('User not found');
    }

    const passwordMatched = await bcrypt.compare(
      loginInStudentDto.password,
      StudentFound.password,
    );

    if (!passwordMatched) {
      throw new UnauthorizedException();
    }

    const payload = { email: StudentFound.email, role: StudentFound.role }; // Include user's role in the payload
    const token = this.jwtService.sign(payload);

    return { token };
  }
 */

  async studentAllEnrolledCourses(student_id: number) {
    const studentWithCourses = await this.studentRepository
      .createQueryBuilder('student')
      .leftJoinAndSelect('student.enrollments', 'enrollment')
      .leftJoinAndSelect('enrollment.course', 'course')
      .where('student.id = :id', { id: student_id })
      .getMany();

    return studentWithCourses;
  }

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

    // console.log('updatedData', updatedData);
  }

  async studentData(id: number) {
    const student = await this.studentRepository.findOne({ where: { id } });

    if (!student) {
      throw new NotFoundException();
    }
    return student;
  }

  async findAll() {
    const allStudentResult = await this.studentRepository.find();
    return allStudentResult;
  }

  async findOne(email: string): Promise<Student | undefined> {
    const temp = await this.studentRepository.findOne({ where: { email } });
    return temp;
  }

  async findByID(id: number): Promise<Student | undefined> {
    const temp = await this.studentRepository.findOne({ where: { id } });
    return temp;
  }

  async updateIsVerifiedStatus(
    studentId: number,
    is_Verified: boolean,
  ): Promise<void> {
    await this.studentRepository.update(studentId, { is_Verified });
  }
}
