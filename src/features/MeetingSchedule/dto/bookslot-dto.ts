import { IsDate, IsEmpty, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { MeetingSchedule } from '../entity/meetingSchedule.entity';

export class BookSlotDto {
  @IsNumber()
  @IsNotEmpty()
  availableSlot_id: number;

  @IsNumber()
  @IsNotEmpty()
  student_id: number;
}
