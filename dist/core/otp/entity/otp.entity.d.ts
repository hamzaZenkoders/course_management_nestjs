import { OtpPurpose } from 'src/features/enums/otpEnum';
import { Student } from 'src/features/student/entities/student.entity';
export declare class OTP {
    id: number;
    otp: string;
    purpose: OtpPurpose;
    createdAt: Date;
    expiresAt: Date;
    student: Student;
}
