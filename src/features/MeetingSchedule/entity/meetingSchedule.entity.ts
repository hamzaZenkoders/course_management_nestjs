import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Teacher } from 'src/features/teacher/entities/teacher.entity';
import { daysEnum } from '../../enums/days';
import { Student } from 'src/features/student/entities/student.entity';
import { AvailableSlot } from 'src/features/availableSlots/entity/availableSlots.entity';
import { MeetingStatus } from 'src/features/enums/meetingStatus';

@Entity()
export class MeetingSchedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: MeetingStatus,
    default: MeetingStatus.pending,
  })
  status: MeetingStatus;

  @OneToOne(() => AvailableSlot)
  @JoinColumn({ name: 'availableSlot_id' })
  availableSlot: AvailableSlot;

  @ManyToOne(() => Student, (student) => student.meetingSchedules)
  @JoinColumn({ name: 'student_id' })
  student: Student;
}
