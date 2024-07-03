import { EnrollmentStatus } from 'src/features/enums/enrollmentStatus';
export declare class CreateEnrollmentDto {
    status: EnrollmentStatus;
    updatedAt: Date;
    student_id: number;
    course_id: number;
}
