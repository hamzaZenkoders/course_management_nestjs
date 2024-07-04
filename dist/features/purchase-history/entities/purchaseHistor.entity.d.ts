import { Course } from '../../course/entities/course.entity';
import { Student } from 'src/features/student/entities/student.entity';
export declare class PurchaseHistory {
    id: number;
    student: Student;
    course: Course;
    purchaseDate: Date;
}
