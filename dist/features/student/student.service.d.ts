import { HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { PaginationSearchDto } from '../admin/dto/paginationSearch-dto';
export declare class StudentService {
    private studentRepository;
    constructor(studentRepository: Repository<Student>);
    studentAllEnrolledCourses(student_id: number): Promise<Student[]>;
    updateStudentProfile(id: number, updatingData: Object): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    studentData(id: number): Promise<Student>;
    getAllStudents(paginationSearchDto: PaginationSearchDto): Promise<{
        data: Student[];
        count: number;
    }>;
    updateIsVerifiedStatus(studentId: number, is_Verified: boolean): Promise<void>;
    findOne(email: string): Promise<Student | undefined>;
    findByID(id: number): Promise<Student | undefined>;
    findAll(): Promise<Student[]>;
}
