import { Repository } from 'typeorm';
import { TeacherService } from '../teacher/teacher.service';
import { BookSlotDto } from './dto/bookslot-dto';
import { MeetingSchedule } from './entity/meetingSchedule.entity';
import { Student } from '../student/entities/student.entity';
import { MeetingConfirmationDto } from './dto/meetingConfirmation-dto';
import { Teacher } from '../teacher/entities/teacher.entity';
import { StudentService } from '../student/student.service';
export declare class meetingScheduleService {
    private readonly meetingSchedulepository;
    private readonly teacherService;
    private readonly studentService;
    private readonly studentrepository;
    private readonly teacherrepository;
    constructor(meetingSchedulepository: Repository<MeetingSchedule>, teacherService: TeacherService, studentService: StudentService, studentrepository: Repository<Student>, teacherrepository: Repository<Teacher>);
    bookMeetinngSlot(bookSlotDto: BookSlotDto): Promise<MeetingSchedule>;
    approveReject(meetingConfirmationDto: MeetingConfirmationDto): Promise<"meeting has been approved" | "meeting has been rejected">;
}
