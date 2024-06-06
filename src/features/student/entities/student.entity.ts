import { Column, PrimaryGeneratedColumn } from "typeorm";

export enum StudentRole {
    admin = "ADMIN",
    teacher = "TEACHER",
    student = "STUDENT",
}

export class Student {
    @PrimaryGeneratedColumn()
    id: number;
   
    @Column({unique: true})
    email:string;

    @Column({type: 'text'})
    password:string;

    @Column({type: 'number'})
    age: number;

    @Column({type:'text'})
    address: string;

    @Column({type:'text'})
    contact: string;

    @Column({type:'text'})
    dateOfBirth: string;

    @Column({type:'text'})
     role: string; 

    @Column({type:'text'})
    createdAt: Date;

    @Column({type:'text'})
    updatedAt: Date;

}
