import { Course } from '../../course/entities/course.entity';
import { Student } from 'src/features/student/entities/student.entity';
import { PurchaseStatus } from 'src/features/enums/purchaseStatus';
export declare class PurchaseHistory {
    id: number;
    student: Student;
    course: Course;
    purchase_status: PurchaseStatus;
    price: Number;
    purchaseDate: Date;
}
