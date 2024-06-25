import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { MeetingSchedule } from './entity/meetingSchedule.entity';
import { meetingScheduleController } from './meetingSchedule.controller';
import { meetingScheduleService } from './meetingSchedule.service';
import { AvailableSlot } from '../availableSlots/entity/availableSlots.entity';
import { Student } from '../student/entities/student.entity';

//import { TeacherModule } from '../teacher/teacher.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MeetingSchedule, AvailableSlot, Student]),
  ],
  controllers: [meetingScheduleController],
  providers: [meetingScheduleService],
  exports: [meetingScheduleService],
})
export class meetingScheduleModule {}
