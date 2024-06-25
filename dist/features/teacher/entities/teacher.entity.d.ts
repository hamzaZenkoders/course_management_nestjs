import { Course } from 'src/features/course/entities/course.entity';
import { Roles } from '../../enums/roles';
import { AvailableSlot } from '../../availableSlots/entity/availableSlots.entity';
import { OTP } from 'src/core/otp/entity/otp.entity';
export declare class Teacher {
    id: number;
    name: string;
    email: string;
    address: string;
    contact: string;
    designation: string;
    password: string;
    role: Roles;
    is_Suspended: boolean;
    is_Verified: boolean;
    createdAt: Date;
    updatedAt: Date;
    courses: Course[];
    availableSlots: AvailableSlot[];
    otps: OTP[];
}
