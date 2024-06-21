import { HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
export declare class StudentService {
    private studentRepository;
    constructor(studentRepository: Repository<Student>);
    studentAllEnrolledCourses(student_id: number): Promise<Student[]>;
    updateStudentProfile(id: number, updatingData: Object): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    studentData(id: number): Promise<Student>;
    findOne(email: string): Promise<Student | undefined>;
    findByID(id: number): Promise<Student | undefined>;
    updateIsVerifiedStatus(studentId: number, is_Verified: boolean): Promise<void>;
}
