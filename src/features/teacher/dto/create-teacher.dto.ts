import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEmpty,
  IsEnum,
  IsInt,
  isInt,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { Roles } from 'src/features/enums/roles';

export class CreateTeacherDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsPhoneNumber()
  contact: string;

  @IsString()
  @IsNotEmpty()
  designation: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsDate()
  dateOfBirth: Date;

  @IsEnum(Roles, {
    message: 'Enter a valid role',
  })
  role: Roles;

  @IsBoolean()
  is_Suspended: boolean = false;

  @IsBoolean()
  is_Verified: boolean = false;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
