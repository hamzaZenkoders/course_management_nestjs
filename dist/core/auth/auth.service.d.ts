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
export declare class AuthService {
    private studentService;
    private studentRepository;
    private otpRepository;
    private readonly mailService;
    private readonly otpService;
    private jwtService;
    private courseService;
    constructor(studentService: StudentService, studentRepository: Repository<Student>, otpRepository: Repository<OTP>, mailService: MailService, otpService: OtpService, jwtService: JwtService, courseService: CourseService);
    validateUser(email: string, password: string): Promise<any>;
    register(createStudentDto: CreateStudentDto): Promise<({
        id: number;
        name: string;
        email: string;
        password: string;
        age: number;
        address: string;
        contact: string;
        date_of_birth: Date;
        role: import("../../features/enums/roles").Roles;
        is_Verified: boolean;
        is_Suspended: boolean;
        createdAt: Date;
        updatedAt: Date;
        otps: OTP[];
        enrollments: import("../../features/enrollment/entities/enrollment.entity").Enrollment[];
    } & Student) | {
        statusCode: HttpStatus;
        message: string;
    }>;
    login(loginInStudentDto: LoginInStudentDto): Promise<{
        token: string;
    }>;
}
