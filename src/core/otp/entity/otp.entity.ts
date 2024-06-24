import { Admin } from 'src/features/admin/entities/admin.entity';
import { OtpPurpose } from 'src/features/enums/otpEnum';
import { Student } from 'src/features/student/entities/student.entity';
import { Teacher } from 'src/features/teacher/entities/teacher.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OTP {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  otp: number;

  @Column({
    type: 'enum',
    enum: OtpPurpose,
  })
  purpose: OtpPurpose;
  /* 
  @Column({ type: 'boolean', default: () => 'false' }) //change in ERD also
  isVerified: boolean; */

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
  })
  expiresAt: Date;

  @ManyToOne(() => Student, (student) => student.otps)
  student: Student;

  @ManyToOne(() => Teacher, (teacher) => teacher.otps)
  teacher: Teacher;

  @ManyToOne(() => Admin, (admin) => admin.otps)
  admin: Admin;
}
//
