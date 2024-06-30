import { Roles } from 'src/features/enums/roles';
import { OTP } from 'src/core/otp/entity/otp.entity';
import { Enrollment } from 'src/features/enrollment/entities/enrollment.entity';
import { MeetingSchedule } from 'src/features/MeetingSchedule/entity/meetingSchedule.entity';
import { Chat } from 'src/core/chat/entity/chat.entity';
export declare class Student {
    id: number;
    name: string;
    email: string;
    password: string;
    age: number;
    address: string;
    contact: string;
    date_of_birth: Date;
    role: Roles;
    is_Verified: boolean;
    is_Suspended: boolean;
    createdAt: Date;
    updatedAt: Date;
    otps: OTP[];
    enrollments: Enrollment[];
    meetingSchedules: MeetingSchedule[];
    chats: Chat[];
}
