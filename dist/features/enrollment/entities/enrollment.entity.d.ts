import { Course } from 'src/features/course/entities/course.entity';
import { EnrollmentStatus } from 'src/features/enums/enrollmentStatus';
import { Student } from 'src/features/student/entities/student.entity';
export declare class Enrollment {
    id: number;
    enrollmentDate: Date;
    status: EnrollmentStatus;
    updatedAt: Date;
    student: Student;
    course: Course;
}
