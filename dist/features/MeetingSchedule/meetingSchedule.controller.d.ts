import { meetingScheduleService } from './meetingSchedule.service';
import { BookSlotDto } from './dto/bookslot-dto';
import { MeetingConfirmationDto } from './dto/meetingConfirmation-dto';
export declare class meetingScheduleController {
    private readonly meetingScheduleService;
    constructor(meetingScheduleService: meetingScheduleService);
    bookSlot(bookSlotDto: BookSlotDto): Promise<import("./entity/meetingSchedule.entity").MeetingSchedule>;
    ApproveRejectMeeting(meetingConfirmationDto: MeetingConfirmationDto): Promise<"meeting has been approved" | "meeting has been rejected">;
}
