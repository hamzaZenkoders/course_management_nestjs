import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Course } from '../../course/entities/course.entity';
import { Student } from 'src/features/student/entities/student.entity';
import { PurchaseStatus } from 'src/features/enums/purchaseStatus';

@Entity()
export class PurchaseHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Student, (student) => student.purchases)
  student: Student;

  @ManyToOne(() => Course, (course) => course.purchases)
  course: Course;

  @Column({
    type: 'enum',
    enum: PurchaseStatus,
  })
  purchase_status: PurchaseStatus;

  @Column({ type: 'bigint' })
  price: Number;

  @CreateDateColumn()
  purchaseDate: Date;
}
