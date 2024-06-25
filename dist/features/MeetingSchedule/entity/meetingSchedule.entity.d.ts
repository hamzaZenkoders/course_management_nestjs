import { Student } from 'src/features/student/entities/student.entity';
import { AvailableSlot } from 'src/features/availableSlots/entity/availableSlots.entity';
import { MeetingStatus } from 'src/features/enums/meetingStatus';
export declare class MeetingSchedule {
    id: number;
    status: MeetingStatus;
    availableSlot: AvailableSlot;
    student: Student;
}
