import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Teacher } from 'src/features/teacher/entities/teacher.entity';
import { daysEnum } from '../../enums/days';

@Entity()
export class AvailableSlot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', nullable: false })
  slot_start: Date;

  @Column({ type: 'timestamp', nullable: false }) ///
  slot_end: Date;

  @Column({ type: 'boolean', default: false })
  is_booked: boolean;

  @Column({ type: 'boolean', default: true })
  availability: boolean;

  @ManyToOne(() => Teacher, (teacher) => teacher.availableSlots)
  @JoinColumn({ name: 'teacher_id' })
  teacher: Teacher;
}
