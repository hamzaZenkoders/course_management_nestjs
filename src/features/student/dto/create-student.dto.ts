import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEmpty,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { Roles } from 'src/features/enums/roles';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsInt()
  @IsNotEmpty()
  age: number;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsPhoneNumber()
  contact: string;

  @IsDate()
  dateOfBirth: Date;

  @IsEnum(Roles, {
    message: 'Enter a valid role',
  })
  role: Roles;

  @IsBoolean()
  isVerified: boolean = false;

  @IsBoolean()
  isSuspended: boolean = false;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
