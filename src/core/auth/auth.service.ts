// auth.service.ts
//import { Injectable } from '@nestjs/common';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { StudentService } from 'src/features/student/student.service';
//import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from 'src/features/student/entities/student.entity';
import { OTP } from '../otp/entity/otp.entity';
import { MailService } from '../mail/mail.service';
import { OtpService } from '../otp/otp.service';
import { JwtService } from '@nestjs/jwt';
import { CourseService } from 'src/features/course/course.service';
import { CreateStudentDto } from 'src/features/student/dto/create-student.dto';

//import { whiteListDomain } from '../entities/whitlistedDomain.entity';

//importing bycrypt

import * as bcrypt from 'bcrypt';
import { LoginInStudentDto } from 'src/features/student/dto/login-student-dto';

@Injectable()
export class AuthService {
  constructor(
    private studentService: StudentService,

    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(OTP)
    private otpRepository: Repository<OTP>,

    private readonly mailService: MailService,
    private readonly otpService: OtpService,
    private jwtService: JwtService,
    private courseService: CourseService,
    //  @InjectRepository(whiteListDomain)
    // private whitelistedDomainRepository: Repository<whiteListDomain>,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.studentService.findOne(email);
    console.log('checkinggggg', user);

    if (user && password === user.password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async register(createStudentDto: CreateStudentDto) {
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
}
