import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { MeetingSchedule } from './entity/meetingSchedule.entity';
import { meetingScheduleController } from './meetingSchedule.controller';
import { meetingScheduleService } from './meetingSchedule.service';

import { Student } from '../student/entities/student.entity';
import { Teacher } from '../teacher/entities/teacher.entity';
import { TeacherModule } from '../teacher/teacher.module';
import { StudentModule } from '../student/student.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MeetingSchedule, Student, Teacher]),
    TeacherModule,
    StudentModule,
  ],
  controllers: [meetingScheduleController],
  providers: [meetingScheduleService],
  exports: [meetingScheduleService],
})
export class meetingScheduleModule {}
