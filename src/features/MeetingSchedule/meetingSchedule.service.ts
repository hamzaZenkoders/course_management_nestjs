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
import { AvailableSlot } from '../availableSlots/entity/availableSlots.entity';
import { MeetingStatus } from '../enums/meetingStatus';
import { Student } from '../student/entities/student.entity';
import { MeetingConfirmationDto } from './dto/meetingConfirmation-dto';
//import { AvailableSlot } from './entity/meetingSchedule.entity';

@Injectable()
export class meetingScheduleService {
  constructor(
    @InjectRepository(MeetingSchedule)
    private readonly meetingSchedulepository: Repository<MeetingSchedule>,

    @InjectRepository(AvailableSlot)
    private readonly availableSlotrepository: Repository<AvailableSlot>,

    @InjectRepository(Student)
    private readonly studentrepository: Repository<Student>,
  ) {}

  async bookMeetinngSlot(bookSlotDto: BookSlotDto) {
    const slot = await this.availableSlotrepository.findOne({
      where: { id: bookSlotDto.availableSlot_id },
    });

    if (!slot) {
      throw new HttpException('Slot not found', HttpStatus.NOT_FOUND);
    }

    if (slot.is_booked) {
      throw new HttpException('Slot is booked', HttpStatus.FORBIDDEN);
    }

    const student = await this.studentrepository.findOne({
      where: { id: bookSlotDto.student_id },
    });

    console.log(bookSlotDto.availableSlot_id);
    console.log(bookSlotDto.student_id);

    /* const meeting = {
      status: MeetingStatus.pending,
      availableSlot_id: bookSlotDto.availableSlot_id,
      student_id: bookSlotDto.student_id,
    }; */

    /*  const meeting = {
      status: MeetingStatus.pending,
      ...bookSlotDto,
    };

         console.log(meeting);
    const meetingCreated = this.meetingSchedulepository.create(meeting);
    console.log(meetingCreated);

   
 */

    const meeting = new MeetingSchedule();
    meeting.status = MeetingStatus.pending;
    meeting.availableSlot = slot;
    meeting.student = student;

    const meetingCreated = this.meetingSchedulepository.create(meeting);
    console.log(meetingCreated);
    const meetingSaved =
      await this.meetingSchedulepository.save(meetingCreated);

    //now change the slot status to booked

    slot.is_booked = true;
    await this.availableSlotrepository.save(slot);

    return meetingSaved;
    /*  const meetingSaved =
      await this.meetingSchedulepository.save(meetingCreated);

    slot.is_booked = true;
    await this.availableSlotrepository.save(slot);

   */
  }

  async approveReject(meetingConfirmationDto: MeetingConfirmationDto) {
    // console.log(meetingConfirmationDto.meetingSchedule_id);
    // console.log(meetingConfirmationDto.confirmation_status);

    const meetingScheduleFound = await this.meetingSchedulepository.findOne({
      where: { id: meetingConfirmationDto.meetingSchedule_id },
      relations: ['availableSlot'],
    });

    console.log(meetingScheduleFound);

    if (meetingConfirmationDto.confirmation_status === 'APPROVED') {
      meetingScheduleFound.status = MeetingStatus.approved;
      await this.meetingSchedulepository.save(meetingScheduleFound);
      return 'meeting has been approved';
    }

    if (meetingConfirmationDto.confirmation_status === 'REJECTED') {
      meetingScheduleFound.status = MeetingStatus.rejected;

      //also free that available slot
      meetingScheduleFound.availableSlot.is_booked = false;
      await this.availableSlotrepository.save(
        meetingScheduleFound.availableSlot,
      );

      await this.meetingSchedulepository.save(meetingScheduleFound);
      return 'meeting has been rejected';
    }
  }
}
