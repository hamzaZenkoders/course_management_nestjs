import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { meetingScheduleService } from './meetingSchedule.service';
import { BookSlotDto } from './dto/bookslot-dto';

@Controller('meetingSchedule')
export class meetingScheduleController {
  constructor(
    private readonly meetingScheduleService: meetingScheduleService,
  ) {}

  @Post()
  bookSlot(@Body() bookSlotDto: BookSlotDto) {
    return this.meetingScheduleService.bookMeetinngSlot(bookSlotDto);
  }
}
