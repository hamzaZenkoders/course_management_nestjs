import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Roles } from 'src/features/enums/roles';
import { Transform } from 'class-transformer';
import { OTP } from 'src/core/otp/entity/otp.entity';
import { Enrollment } from 'src/features/enrollment/entities/enrollment.entity';
import { MeetingSchedule } from 'src/features/MeetingSchedule/entity/meetingSchedule.entity';

/* export enum StudentRole {
    admin = "ADMIN",
    teacher = "TEACHER",
    student = "STUDENT",
} */

@Entity()
export class Student {
  @Transform((value) => value, { toPlainOnly: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'int' })
  age: number;

  @Column({ type: 'varchar' })
  address: string;

  @Column({ type: 'varchar' })
  contact: string;

  @Column({ type: 'timestamp' })
  date_of_birth: Date;

  @Column({
    type: 'enum',
    enum: Roles,
    default: Roles.student,
  })
  role: Roles;

  @Column({ type: 'boolean', default: false }) //change in ERD also
  is_Verified: boolean;

  @Column({ type: 'boolean', default: false })
  is_Suspended: boolean;

  @Column({
    type: 'timestamp',
    //default: () => 'CURRENT_TIMESTAMP' })
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: null,
  })
  updatedAt: Date;

  @OneToMany(() => OTP, (otp) => otp.student)
  otps: OTP[];

  @OneToMany(() => Enrollment, (enrollment) => enrollment.student)
  enrollments: Enrollment[];

  @OneToMany(
    () => MeetingSchedule,
    (meetingSchedule) => meetingSchedule.student,
  )
  meetingSchedules: MeetingSchedule[];
}
