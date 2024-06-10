import { Roles } from 'src/features/enums/roles';
export declare class CreateStudentDto {
    name: string;
    email: string;
    password: string;
    age: number;
    address: string;
    contact: string;
    dateOfBirth: Date;
    role: Roles;
    isVerified: boolean;
    isSuspended: boolean;
    createdAt: Date;
    updatedAt: Date;
}
