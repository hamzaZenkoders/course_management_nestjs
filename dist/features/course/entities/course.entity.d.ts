import { Enrollment } from 'src/features/enrollment/entities/enrollment.entity';
import { Teacher } from 'src/features/teacher/entities/teacher.entity';
export declare class Course {
    id: number;
    name: string;
    description: string;
    type: string;
    dropDeadline: Date;
    createdAt: Date;
    updatedAt: Date;
    teacher: Teacher;
    enrollments: Enrollment[];
}
