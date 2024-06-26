import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Teacher } from 'src/features/teacher/entities/teacher.entity';
import { Student } from 'src/features/student/entities/student.entity';

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

  @Column({ type: 'timestamp' })
  slot_start: Date;

  @Column({ type: 'timestamp' })
  slot_end: Date;

  @ManyToOne(() => Student, (student) => student.meetingSchedules)
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @ManyToOne(() => Teacher, (teacher) => teacher.meetingSchedules)
  @JoinColumn({ name: 'teacher_id' })
  teacher: Teacher;
}
