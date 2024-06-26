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
import { MeetingConfirmationDto } from './dto/meetingConfirmation-dto';
import { Role } from 'src/core/decorator/roles.decorator';
import { AuthenticationGuard } from 'src/core/guards/authentication.guard';
import { RoleAuthorizationGuard } from 'src/core/guards/roleAuthorization.guard';

@Controller('meetingSchedule')
export class meetingScheduleController {
  constructor(
    private readonly meetingScheduleService: meetingScheduleService,
  ) {}

  @Role('STUDENT')
  @UseGuards(AuthenticationGuard, RoleAuthorizationGuard) //to book meeting
  @Post()
  bookSlot(@Body() bookSlotDto: BookSlotDto) {
    return this.meetingScheduleService.bookMeetinngSlot(bookSlotDto);
  }

  // @Role('TEACHER')
  //@UseGuards(AuthenticationGuard, RoleAuthorizationGuard) //to approve or reject
  @Post('/confirmation')
  ApproveRejectMeeting(@Body() meetingConfirmationDto: MeetingConfirmationDto) {
    return this.meetingScheduleService.approveReject(meetingConfirmationDto);
  }
}
