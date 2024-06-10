import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Roles } from 'src/features/enums/roles';
import { whiteListDomain } from 'src/core/entities/whitlistedDomain.entity';
import { OTP } from 'src/core/entities/otp.entity';
import { Transform } from 'class-transformer';

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
  dateOfBirth: Date;

  @Column({
    type: 'enum',
    enum: Roles,
    default: Roles.student,
  })
  role: Roles;

  @Column({ type: 'boolean', default: false }) //change in ERD also
  isVerified: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToOne(() => whiteListDomain)
  @JoinColumn()
  domainID: whiteListDomain;

  @OneToMany(() => OTP, (otp) => otp.student)
  otps: OTP[];
}
