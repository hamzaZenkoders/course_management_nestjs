import { HttpStatus } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { OTP } from 'src/core/entities/otp.entity';
export declare class StudentService {
    private studentRepository;
    private otpRepository;
    constructor(studentRepository: Repository<Student>, otpRepository: Repository<OTP>);
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
        createdAt: Date;
        updatedAt: Date;
        domainID: import("../../core/entities/whitlistedDomain.entity").whiteListDomain;
        otps: OTP[];
    } & Student) | {
        statusCode: HttpStatus;
        message: string;
    }>;
    findOne(email: string): Promise<Student | undefined>;
}
