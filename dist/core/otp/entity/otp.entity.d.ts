import { Admin } from 'src/features/admin/entities/admin.entity';
import { OtpPurpose } from 'src/features/enums/otpEnum';
import { Student } from 'src/features/student/entities/student.entity';
import { Teacher } from 'src/features/teacher/entities/teacher.entity';
export declare class OTP {
    id: number;
    otp: number;
    purpose: OtpPurpose;
    createdAt: Date;
    expiresAt: Date;
    student: Student;
    teacher: Teacher;
    admin: Admin;
}
