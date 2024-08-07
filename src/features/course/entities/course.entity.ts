import { Enrollment } from 'src/features/enrollment/entities/enrollment.entity';
import { Teacher } from 'src/features/teacher/entities/teacher.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PurchaseHistory } from '../../purchase-history/entities/purchaseHistor.entity';
import { CourseStatus } from 'src/features/enums/courseStatus';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'varchar' })
  type: string;

  @Column({ type: 'timestamp' })
  dropDeadline: Date;

  @Column({ type: 'integer' })
  price: number;

  @Column({
    type: 'enum',
    enum: CourseStatus,
  })
  courseStatus: CourseStatus;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  createdAt: Date;

  @Column({
    type: 'date',
    default: null,
    onUpdate: 'CURRENT_DATE',
  })
  updatedAt: Date;

  @ManyToOne(() => Teacher, (teacher) => teacher.courses)
  @JoinColumn({ name: 'teacher_id' })
  teacher: Teacher;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.course)
  enrollments: Enrollment[];

  @OneToMany(() => PurchaseHistory, (purchase) => purchase.course)
  purchases: PurchaseHistory[];
}
