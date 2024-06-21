import { AuthService } from './auth.service';
import { CreateStudentDto } from 'src/features/student/dto/create-student.dto';
import { LoginInStudentDto } from 'src/features/student/dto/login-student-dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    create(createStudentDto: CreateStudentDto): Promise<({
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
        otps: import("../otp/entity/otp.entity").OTP[];
        enrollments: import("../../features/enrollment/entities/enrollment.entity").Enrollment[];
    } & import("../../features/student/entities/student.entity").Student) | {
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    signIn(loginInStudentDto: LoginInStudentDto): Promise<{
        token: string;
    }>;
}
