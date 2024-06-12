import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Teacher } from 'src/features/teacher/entities/teacher.entity';
import { daysEnum } from '../../enums/days';

@Entity()
export class AvailableSlot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', nullable: false })
  time: Date;

  @Column({ type: 'enum', enum: daysEnum })
  day: daysEnum;

  @Column({ type: 'boolean', default: true })
  availability: boolean;

  @ManyToOne(() => Teacher, (teacher) => teacher.availableSlots)
  teacher: Teacher;
}
