import { EnrollmentStatus } from 'src/features/enums/enrollmentStatus';
export declare class CreateEnrollmentDto {
    EnrollmentDate: Date;
    status: EnrollmentStatus;
    updatedAt: Date;
    student_id: number;
    course_id: number;
}
