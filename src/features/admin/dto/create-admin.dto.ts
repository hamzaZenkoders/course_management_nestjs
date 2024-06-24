import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEmpty,
  IsEnum,
  IsInt,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { Roles } from 'src/features/enums/roles';

export class CreateAdminDto {
  @IsString()
  @IsEmpty()
  name: string;

  @IsEmail()
  @IsEmpty()
  email: string;

  @IsString()
  @IsEmpty()
  password: string;
  //
  @IsEnum(Roles, {
    message: 'Enter a valid role',
  })
  role: Roles;
}
