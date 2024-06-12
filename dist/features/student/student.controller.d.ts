import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
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
        otps: import("../../core/otp/entity/otp.entity").OTP[];
        enrollments: import("../enrollment/entities/enrollment.entity").Enrollment[];
    } & import("./entities/student.entity").Student) | {
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    signIn(loginInStudentDto: LoginInStudentDto): Promise<{
        token: string;
    }>;
    EnrollInCourse(): string;
}
