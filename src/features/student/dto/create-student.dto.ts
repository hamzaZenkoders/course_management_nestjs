import { IsDate, IsEmail, IsEmpty, IsEnum, IsInt, isInt, IsNumber, IsPhoneNumber, IsString } from "class-validator";
import { Roles } from "src/features/enums/roles";


/* export enum StudentRole {
    admin = "ADMIN",
    teacher = "TEACHER",
    student = "STUDENT",
  
} */

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

    @IsEnum(Roles, {
        message: "Enter a valid role"
    })
    role:Roles;

    @IsDate()
    createdAt: Date;

    @IsDate()
    updatedAt: Date;
}
