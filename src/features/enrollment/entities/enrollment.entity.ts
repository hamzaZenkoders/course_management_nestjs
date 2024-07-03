import { Course } from 'src/features/course/entities/course.entity';
import { EnrollmentStatus } from 'src/features/enums/enrollmentStatus';
import { Student } from 'src/features/student/entities/student.entity';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Enrollment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  enrollmentDate: Date;

  @Column({
    type: 'enum',
    enum: EnrollmentStatus,
    default: EnrollmentStatus.active,
  })
  status: EnrollmentStatus;

  @Column({
    type: 'date',
    default: null,
    onUpdate: 'CURRENT_DATE',
  })
  updatedAt: Date;

  @ManyToOne(() => Student, (student) => student.enrollments)
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @ManyToOne(() => Course, (course) => course.enrollments)
  @JoinColumn({ name: 'course_id' }) //courseID
  course: Course;
}
