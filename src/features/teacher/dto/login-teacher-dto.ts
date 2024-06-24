import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class LoginInTeacherDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
