import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { OTP } from 'src/core/otp/entity/otp.entity';
import { IsEnum } from 'class-validator';
import { Roles } from 'src/features/enums/roles';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;
  //
  @Column({
    type: 'enum',
    enum: Roles,
    default: Roles.admin,
  })
  role: Roles;

  @Column({ type: 'boolean', default: false }) //change in ERD also
  is_Verified: boolean;

  @OneToMany(() => OTP, (otp) => otp.admin)
  otps: OTP[];
}
