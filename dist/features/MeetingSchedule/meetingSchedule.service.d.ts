import { Repository } from 'typeorm';
import { BookSlotDto } from './dto/bookslot-dto';
import { MeetingSchedule } from './entity/meetingSchedule.entity';
import { AvailableSlot } from '../availableSlots/entity/availableSlots.entity';
import { Student } from '../student/entities/student.entity';
export declare class meetingScheduleService {
    private readonly meetingSchedulepository;
    private readonly availableSlotrepository;
    private readonly studentrepository;
    constructor(meetingSchedulepository: Repository<MeetingSchedule>, availableSlotrepository: Repository<AvailableSlot>, studentrepository: Repository<Student>);
    bookMeetinngSlot(bookSlotDto: BookSlotDto): Promise<MeetingSchedule>;
}
