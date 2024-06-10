import { Course } from "src/features/course/entities/course.entity";
import { Roles } from "../../enums/roles";
export declare class Teacher {
    id: number;
    name: string;
    email: string;
    address: string;
    contact: string;
    designation: string;
    password: string;
    role: Roles;
    isSuspended: boolean;
    createdAt: Date;
    updatedAt: Date;
    courses: Course[];
}
