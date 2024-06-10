import { Teacher } from "src/features/teacher/entities/teacher.entity";
export declare class Course {
    id: number;
    courseCode: string;
    description: string;
    courseType: string;
    dropDeadline: Date;
    createdAt: Date;
    updatedAt: Date;
    teacher: Teacher;
}
