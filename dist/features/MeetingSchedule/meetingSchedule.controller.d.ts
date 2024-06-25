import { meetingScheduleService } from './meetingSchedule.service';
import { BookSlotDto } from './dto/bookslot-dto';
export declare class meetingScheduleController {
    private readonly meetingScheduleService;
    constructor(meetingScheduleService: meetingScheduleService);
    bookSlot(bookSlotDto: BookSlotDto): Promise<import("./entity/meetingSchedule.entity").MeetingSchedule>;
}
