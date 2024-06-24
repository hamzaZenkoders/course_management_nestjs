import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class LoginInAdminDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
