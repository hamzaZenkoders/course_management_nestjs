import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEmpty,
  IsEnum,
  IsInt,
  isInt,
  IsNumber,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { Roles } from 'src/features/enums/roles';

export class CreateTeacherDto {
  @IsString()
  @IsEmpty()
  name: string;

  @IsEmail()
  @IsEmpty()
  email: string;

  @IsString()
  @IsEmpty()
  address: string;

  @IsPhoneNumber()
  contact: string;

  @IsString()
  @IsEmpty()
  designation: string;

  @IsString()
  @IsEmpty()
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
