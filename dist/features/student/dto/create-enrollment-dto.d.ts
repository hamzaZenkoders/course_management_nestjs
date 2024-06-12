import { EnrollmentStatus } from 'src/features/enums/enrollmentStatus';
export declare class CreateEnrollmentDto {
    EnrollmentDate: Date;
    status: EnrollmentStatus;
    createdAt: Date;
    updatedAt: Date;
    studentId: number;
    courseId: number;
}
