import { Teacher } from 'src/features/teacher/entities/teacher.entity';
import { Student } from 'src/features/student/entities/student.entity';
import { MeetingStatus } from 'src/features/enums/meetingStatus';
export declare class MeetingSchedule {
    id: number;
    status: MeetingStatus;
    slot_start: Date;
    slot_end: Date;
    student: Student;
    teacher: Teacher;
}
