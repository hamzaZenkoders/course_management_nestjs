import { Enrollment } from 'src/features/enrollment/entities/enrollment.entity';
import { Teacher } from 'src/features/teacher/entities/teacher.entity';
import { PurchaseHistory } from '../../purchase-history/entities/purchaseHistor.entity';
export declare class Course {
    id: number;
    name: string;
    description: string;
    type: string;
    dropDeadline: Date;
    price: number;
    createdAt: Date;
    updatedAt: Date;
    teacher: Teacher;
    enrollments: Enrollment[];
    purchases: PurchaseHistory[];
}
