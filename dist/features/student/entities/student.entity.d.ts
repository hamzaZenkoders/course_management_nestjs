import { Roles } from 'src/features/enums/roles';
import { OTP } from 'src/core/otp/entity/otp.entity';
import { Enrollment } from 'src/features/enrollment/entities/enrollment.entity';
export declare class Student {
    id: number;
    name: string;
    email: string;
    password: string;
    age: number;
    address: string;
    contact: string;
    dateOfBirth: Date;
    role: Roles;
    isVerified: boolean;
    isSuspended: boolean;
    createdAt: Date;
    updatedAt: Date;
    otps: OTP[];
    enrollments: Enrollment[];
}
