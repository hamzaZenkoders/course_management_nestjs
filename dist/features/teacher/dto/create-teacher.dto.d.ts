import { Roles } from 'src/features/enums/roles';
export declare class CreateTeacherDto {
    name: string;
    email: string;
    address: string;
    contact: string;
    designation: string;
    password: string;
    dateOfBirth: Date;
    role: Roles;
    is_Suspended: boolean;
    is_Verified: boolean;
    createdAt: Date;
    updatedAt: Date;
}
