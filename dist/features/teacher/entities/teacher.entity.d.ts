import { Course } from 'src/features/course/entities/course.entity';
import { Roles } from '../../enums/roles';
import { OTP } from 'src/core/otp/entity/otp.entity';
import { MeetingSchedule } from 'src/features/MeetingSchedule/entity/meetingSchedule.entity';
import { Chat } from 'src/core/chat/entity/chat.entity';
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
    otps: OTP[];
    meetingSchedules: MeetingSchedule[];
    chats: Chat[];
}
