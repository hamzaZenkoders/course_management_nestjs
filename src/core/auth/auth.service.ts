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
import { CreateTeacherDto } from 'src/features/teacher/dto/create-teacher.dto';
import { Teacher } from 'src/features/teacher/entities/teacher.entity';
import { TeacherService } from 'src/features/teacher/teacher.service';
import { LoginInTeacherDto } from 'src/features/teacher/dto/login-teacher-dto';
import { CreateAdminDto } from 'src/features/admin/dto/create-admin.dto';
import { Admin } from 'src/features/admin/entities/admin.entity';
import { LoginInAdminDto } from 'src/features/admin/dto/login-admin-dto';

@Injectable()
export class AuthService {
  constructor(
    private studentService: StudentService,
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,

    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(OTP)
    private otpRepository: Repository<OTP>,

    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,

    private readonly mailService: MailService,
    private readonly otpService: OtpService,
    private readonly teacherService: TeacherService,
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

    console.log(createStudentDto);
    const existingUser = await this.studentRepository.findOne({
      where: { email: createStudentDto.email },
    });

    if (existingUser) {
      throw new HttpException('Student already exists', HttpStatus.FORBIDDEN);
    }

    console.log(createStudentDto);
    const hashedPassword = await bcrypt.hash(createStudentDto.password, 10);

    const newStudent = this.studentRepository.create({
      ...createStudentDto,
      password: hashedPassword,
    }); //

    //saving to database
    const savedStudent = await this.studentRepository.save(newStudent);

    //generating otp
    const otpRecieved = await this.otpService.generateOTP();
    //  const encryptedOtp = await bcrypt.hash(otpRecieved,10);

    if (savedStudent.is_Verified === false) {
      //saving Otp in the otp table

      await this.otpService.saveOtp(savedStudent.id, otpRecieved, 'student');
      //sending otp
      await this.mailService.sendEmailOtp(savedStudent.email, otpRecieved); //
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

    const payload = {
      id: StudentFound.id,
      email: StudentFound.email,
      role: StudentFound.role,
    };
    const token = this.jwtService.sign(payload);

    return { token };
  }

  ////////////////////////TEACHER/////////////////

  async registerTeacher(createTeacherDto: CreateTeacherDto) {
    //finding is student already exists
    const existingUser = await this.teacherRepository.findOne({
      where: { email: createTeacherDto.email },
    });

    console.log('check env', process.env.Sender_Email);
    if (existingUser) {
      throw new HttpException('Teacher already exists', HttpStatus.FORBIDDEN);
    }

    console.log(CreateTeacherDto);
    const hashedPassword = await bcrypt.hash(createTeacherDto.password, 10);

    const newTeacher = this.teacherRepository.create({
      ...createTeacherDto,
      createdAt: new Date(Date.now()),
      password: hashedPassword,
    }); //

    //saving to database
    const savedTeacher = await this.teacherRepository.save(newTeacher);

    //generating otp
    const otpRecieved = await this.otpService.generateOTP();

    console.log(otpRecieved);
    if (savedTeacher.is_Verified === false) {
      //saving Otp in the otp table

      await this.otpService.saveOtp(savedTeacher.id, otpRecieved, 'teacher');

      //sending otp
      await this.mailService.sendEmailOtp(newTeacher.email, otpRecieved); //
      return {
        statusCode: HttpStatus.OK,
        message: 'Verification otp is sent to email',
      };
    } else {
      console.log('Teacher is verified:', savedTeacher);

      return savedTeacher;
    }
  }

  ////////////LOGIN TEACHER ////////////////////

  async signInTeacher(loginTeacherDto: LoginInTeacherDto) {
    const TeacherFound = await this.teacherRepository.findOne({
      where: { email: loginTeacherDto.email },
    });

    if (!TeacherFound) {
      throw new NotFoundException('Teacher not found');
    }

    const passwordMatched = await bcrypt.compare(
      loginTeacherDto.password,
      TeacherFound.password,
    );

    if (!passwordMatched) {
      throw new UnauthorizedException();
    }

    const payload = {
      id: TeacherFound.id,
      email: TeacherFound.email,
      role: TeacherFound.role,
    }; // Include user's role in the payload
    const token = this.jwtService.sign(payload);

    return { token };
  }

  ///////////////////////////ADMIN////////////////

  async registerAdmin(createAdminDto: CreateAdminDto) {
    //finding is student already exists
    const existingUser = await this.adminRepository.findOne({
      where: { email: createAdminDto.email },
    });

    console.log('check env', process.env.Sender_Email);
    if (existingUser) {
      throw new HttpException('Admin already exists', HttpStatus.FORBIDDEN);
    }

    const hashedPassword = await bcrypt.hash(createAdminDto.password, 10);

    const newAdmin = this.adminRepository.create({
      ...createAdminDto,
      password: hashedPassword,
    }); //

    //saving to database
    const savedAdmin = await this.adminRepository.save(newAdmin); //

    //generating otp
    const otpRecieved = await this.otpService.generateOTP();
    //  const encryptedOtp = await bcrypt.hash(otpRecieved,10);

    if (savedAdmin.is_Verified === false) {
      //saving Otp in the otp table
      //  await this.otpService.saveOtp(savedStudent.id, otpRecieved);
      await this.otpService.saveOtp(savedAdmin.id, otpRecieved, 'student');
      //sending otp
      await this.mailService.sendEmailOtp(newAdmin.email, otpRecieved); //
      return {
        statusCode: HttpStatus.OK,
        message: 'Verification otp is sent to email',
      };
    } else {
      console.log('Admin is verified:', savedAdmin);

      return savedAdmin;
    }
  }

  ////////////LOGIN TEACHER ////////////////////

  async signInAdmin(loginAdminDto: LoginInAdminDto) {
    const AdminFound = await this.adminRepository.findOne({
      where: { email: loginAdminDto.email },
    });

    if (!AdminFound) {
      throw new NotFoundException('Admin not found');
    }

    const passwordMatched = await bcrypt.compare(
      loginAdminDto.password,
      AdminFound.password,
    );

    if (!passwordMatched) {
      throw new UnauthorizedException();
    }

    const payload = {
      id: AdminFound.id,
      email: AdminFound.email,
      role: AdminFound.role,
    };
    const token = this.jwtService.sign(payload);

    return { token };
  }
}
