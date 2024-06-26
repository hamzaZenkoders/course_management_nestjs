import { IsDate, IsEmpty, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { MeetingSchedule } from '../entity/meetingSchedule.entity';
import { MeetingStatus } from 'src/features/enums/meetingStatus';

export class MeetingConfirmationDto {
  @IsNumber()
  @IsNotEmpty()
  meetingSchedule_id: number;

  @IsEnum(MeetingStatus)
  confirmation_status: MeetingStatus;
}
