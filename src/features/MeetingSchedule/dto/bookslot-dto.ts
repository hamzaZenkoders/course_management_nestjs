import {
  IsBoolean,
  IsDate,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';
import { MeetingSchedule } from '../entity/meetingSchedule.entity';
import { MeetingStatus } from 'src/features/enums/meetingStatus';

export class BookSlotDto {
  @IsDate()
  @IsNotEmpty()
  slot_start: Date;

  @IsDate()
  @IsNotEmpty()
  slot_end: Date;

  @IsNumber()
  @IsNotEmpty()
  student_id: number;

  @IsNumber()
  @IsNotEmpty()
  teacher_id: number;
}
