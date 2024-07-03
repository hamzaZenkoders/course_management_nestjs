import { HttpStatus } from '@nestjs/common';
import { StudentService } from 'src/features/student/student.service';
import { Repository } from 'typeorm';
import { Student } from 'src/features/student/entities/student.entity';
import { OTP } from '../otp/entity/otp.entity';
import { MailService } from '../mail/mail.service';
import { OtpService } from '../otp/otp.service';
import { JwtService } from '@nestjs/jwt';
import { CourseService } from 'src/features/course/course.service';
import { CreateStudentDto } from 'src/features/student/dto/create-student.dto';
import { LoginInStudentDto } from 'src/features/student/dto/login-student-dto';
import { CreateTeacherDto } from 'src/features/teacher/dto/create-teacher.dto';
import { Teacher } from 'src/features/teacher/entities/teacher.entity';
import { TeacherService } from 'src/features/teacher/teacher.service';
import { LoginInTeacherDto } from 'src/features/teacher/dto/login-teacher-dto';
import { CreateAdminDto } from 'src/features/admin/dto/create-admin.dto';
import { Admin } from 'src/features/admin/entities/admin.entity';
import { LoginInAdminDto } from 'src/features/admin/dto/login-admin-dto';
export declare class AuthService {
    private studentService;
    private readonly adminRepository;
    private studentRepository;
    private otpRepository;
    private readonly teacherRepository;
    private readonly mailService;
    private readonly otpService;
    private readonly teacherService;
    private jwtService;
    private courseService;
    constructor(studentService: StudentService, adminRepository: Repository<Admin>, studentRepository: Repository<Student>, otpRepository: Repository<OTP>, teacherRepository: Repository<Teacher>, mailService: MailService, otpService: OtpService, teacherService: TeacherService, jwtService: JwtService, courseService: CourseService);
    validateUser(email: string, password: string): Promise<any>;
    register(createStudentDto: CreateStudentDto): Promise<Student | {
        statusCode: HttpStatus;
        message: string;
    }>;
    login(loginInStudentDto: LoginInStudentDto): Promise<{
        token: string;
    }>;
    registerTeacher(createTeacherDto: CreateTeacherDto): Promise<Teacher | {
        statusCode: HttpStatus;
        message: string;
    }>;
    signInTeacher(loginTeacherDto: LoginInTeacherDto): Promise<{
        token: string;
    }>;
    registerAdmin(createAdminDto: CreateAdminDto): Promise<Admin | {
        statusCode: HttpStatus;
        message: string;
    }>;
    signInAdmin(loginAdminDto: LoginInAdminDto): Promise<{
        token: string;
    }>;
}
