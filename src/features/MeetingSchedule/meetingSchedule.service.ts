import {
  HttpException,
  HttpStatus,
  Injectable,
  Param,
  Query,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeacherService } from '../teacher/teacher.service';
import { BookSlotDto } from './dto/bookslot-dto';
import { MeetingSchedule } from './entity/meetingSchedule.entity';

import { MeetingStatus } from '../enums/meetingStatus';
import { Student } from '../student/entities/student.entity';
import { MeetingConfirmationDto } from './dto/meetingConfirmation-dto';
import { Teacher } from '../teacher/entities/teacher.entity';
import { StudentService } from '../student/student.service';
//import { AvailableSlot } from './entity/meetingSchedule.entity';

@Injectable()
export class meetingScheduleService {
  constructor(
    @InjectRepository(MeetingSchedule)
    private readonly meetingSchedulepository: Repository<MeetingSchedule>,
    private readonly teacherService: TeacherService,
    private readonly studentService: StudentService,

    @InjectRepository(Student)
    private readonly studentrepository: Repository<Student>,

    @InjectRepository(Teacher)
    private readonly teacherrepository: Repository<Teacher>,
  ) {}

  //book meeting slot
  async bookMeetinngSlot(bookSlotDto: BookSlotDto) {
    const teacher = await this.teacherService.findByID(bookSlotDto.teacher_id);

    if (!teacher) {
      throw new HttpException('Teacher not found', HttpStatus.NOT_FOUND);
    }

    const student = await this.studentService.findByID(bookSlotDto.student_id);

    if (!student) {
      throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
    }

    const slotStart = new Date(bookSlotDto.slot_start);
    const slotEnd = new Date(bookSlotDto.slot_end);

    const meeting = new MeetingSchedule();
    meeting.status = MeetingStatus.pending;
    meeting.slot_start = slotStart;
    meeting.slot_end = slotEnd;
    meeting.student = student;
    meeting.teacher = teacher;

    const meetingCreated = this.meetingSchedulepository.create(meeting);
    console.log(meetingCreated);
    const meetingSaved =
      await this.meetingSchedulepository.save(meetingCreated);

    return meetingSaved;
  }

  //approve and reject meeting
  async approveReject(meetingConfirmationDto: MeetingConfirmationDto) {
    const meetingScheduleFound = await this.meetingSchedulepository.findOne({
      where: { id: meetingConfirmationDto.meetingSchedule_id },
    });

    console.log(meetingScheduleFound);

    if (meetingConfirmationDto.confirmation_status === 'APPROVED') {
      meetingScheduleFound.status = MeetingStatus.approved;
      await this.meetingSchedulepository.save(meetingScheduleFound);
      return 'meeting has been approved';
    }

    if (meetingConfirmationDto.confirmation_status === 'REJECTED') {
      meetingScheduleFound.status = MeetingStatus.rejected;

      await this.meetingSchedulepository.save(meetingScheduleFound);
      return 'meeting has been rejected';
    }
  }
}
