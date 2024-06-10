import { HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { OTP } from 'src/core/otp/entity/otp.entity';
import { Student } from './entities/student.entity';
import { MailService } from 'src/core/mail/mail.service';
import { OtpService } from 'src/core/otp/otp.service';
import { LoginInStudentDto } from './dto/login-student-dto';
export declare class StudentService {
    private studentRepository;
    private otpRepository;
    private readonly mailService;
    private readonly otpService;
    constructor(studentRepository: Repository<Student>, otpRepository: Repository<OTP>, mailService: MailService, otpService: OtpService);
    register(createStudentDto: CreateStudentDto): Promise<({
        id: number;
        name: string;
        email: string;
        password: string;
        age: number;
        address: string;
        contact: string;
        dateOfBirth: Date;
        role: import("../enums/roles").Roles;
        isVerified: boolean;
        isSuspended: boolean;
        createdAt: Date;
        updatedAt: Date;
        domainID: import("../../core/entities/whitlistedDomain.entity").whiteListDomain;
        otps: OTP[];
    } & Student) | {
        statusCode: HttpStatus;
        message: string;
    }>;
    login(loginInStudentDto: LoginInStudentDto): Promise<void>;
    findOne(email: string): Promise<Student | undefined>;
}
