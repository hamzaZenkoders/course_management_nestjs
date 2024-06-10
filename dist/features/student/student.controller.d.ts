import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { whiteListDomain } from 'src/core/entities/whitlistedDomain.entity';
import { LoginInStudentDto } from './dto/login-student-dto';
export declare class StudentController {
    private readonly studentService;
    constructor(studentService: StudentService);
    create(createStudentDto: CreateStudentDto): Promise<({
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
        domainID: whiteListDomain;
        otps: import("../../core/otp/entity/otp.entity").OTP[];
    } & import("./entities/student.entity").Student) | {
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    signIn(loginInStudentDto: LoginInStudentDto): Promise<void>;
    getData(): string;
    getDataTwo(createStudentDto: CreateStudentDto): Promise<import("./entities/student.entity").Student>;
}
