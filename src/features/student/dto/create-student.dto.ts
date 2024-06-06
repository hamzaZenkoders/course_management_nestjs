import { IsDate, IsEmail, IsEmpty, IsEnum, IsInt, isInt, IsNumber, IsPhoneNumber, IsString } from "class-validator";


export class CreateStudentDto {
    @IsString()
    @IsEmpty()
    name: string;

    @IsEmail()
    @IsEmpty()
    email:string;

    @IsString()
    @IsEmpty()
    password:string;

    @IsInt()
    @IsEmpty()
    age: number;

    @IsString()
    @IsEmpty()
    address: string;

    @IsPhoneNumber()
    contact: string;

    @IsDate()
    dateOfBirth: Date;

    @IsEnum(["TEACHER" ,"STUDENT" , "ADMIN"],{
        message: "Enter a valid role"
    })
    role: 'TEACHER' | 'STUDENT' | 'ADMIN';

    @IsDate()
    createdAt: Date;

    @IsDate()
    updatedAt: Date;
}
