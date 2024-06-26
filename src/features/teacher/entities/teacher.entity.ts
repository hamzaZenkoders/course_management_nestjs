import { Course } from 'src/features/course/entities/course.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Roles } from '../../enums/roles';

import { OTP } from 'src/core/otp/entity/otp.entity';
import { MeetingSchedule } from 'src/features/MeetingSchedule/entity/meetingSchedule.entity';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'varchar' })
  address: string;

  @Column({ type: 'varchar' })
  contact: string;

  @Column({ type: 'varchar' })
  designation: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({
    type: 'enum',
    enum: Roles,
    default: Roles.teacher,
  })
  role: Roles;

  @Column({ type: 'boolean', default: false }) //change in ERD also
  is_Suspended: boolean;

  @Column({ type: 'boolean', default: false }) //change in ERD also
  is_Verified: boolean;

  @Column({ type: 'date' })
  createdAt: Date;

  @Column({
    type: 'date',
    default: null, //
    onUpdate: 'CURRENT_DATE',
  })
  updatedAt: Date;

  @OneToMany(() => Course, (course) => course.teacher)
  courses: Course[];

  @OneToMany(() => OTP, (otp) => otp.teacher)
  otps: OTP[];

  @OneToMany(
    () => MeetingSchedule,
    (meetingSchedule) => meetingSchedule.teacher,
  )
  meetingSchedules: MeetingSchedule[];
}
