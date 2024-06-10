import { OtpPurpose } from 'src/features/enums/otpEnum';
import { Student } from 'src/features/student/entities/student.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OTP {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  otp: string;

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
}
