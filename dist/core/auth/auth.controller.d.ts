import { AuthService } from './auth.service';
import { CreateStudentDto } from 'src/features/student/dto/create-student.dto';
import { LoginInStudentDto } from 'src/features/student/dto/login-student-dto';
import { CreateTeacherDto } from 'src/features/teacher/dto/create-teacher.dto';
import { LoginInTeacherDto } from 'src/features/teacher/dto/login-teacher-dto';
import { CreateAdminDto } from 'src/features/admin/dto/create-admin.dto';
import { LoginInAdminDto } from 'src/features/admin/dto/login-admin-dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    create(createStudentDto: CreateStudentDto): Promise<import("../../features/student/entities/student.entity").Student | {
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    signIn(loginInStudentDto: LoginInStudentDto): Promise<{
        token: string;
    }>;
    TeacherSignUp(createTeacherDto: CreateTeacherDto): Promise<({
        id: number;
        name: string;
        email: string;
        address: string;
        contact: string;
        designation: string;
        password: string;
        role: import("../../features/enums/roles").Roles;
        is_Suspended: boolean;
        is_Verified: boolean;
        createdAt: Date;
        updatedAt: Date;
        courses: import("../../features/course/entities/course.entity").Course[];
        otps: import("../otp/entity/otp.entity").OTP[];
        meetingSchedules: import("../../features/MeetingSchedule/entity/meetingSchedule.entity").MeetingSchedule[];
    } & import("../../features/teacher/entities/teacher.entity").Teacher) | {
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    TeacherSignIn(loginTeacherDto: LoginInTeacherDto): Promise<{
        token: string;
    }>;
    AdminSignUp(createAdminDto: CreateAdminDto): Promise<import("../../features/admin/entities/admin.entity").Admin | {
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    AdminSignIn(loginAdminDto: LoginInAdminDto): Promise<{
        token: string;
    }>;
}
