import { IsEmail, IsString,  IsNotEmpty } from "class-validator";


export class LoginInStudentDto{
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsString()
    password:string;

}