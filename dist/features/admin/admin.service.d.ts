import { HttpStatus } from '@nestjs/common';
import { TeacherService } from '../teacher/teacher.service';
import { Teacher } from '../teacher/entities/teacher.entity';
import { Repository } from 'typeorm';
import { StudentService } from '../student/student.service';
import { Student } from '../student/entities/student.entity';
export declare class AdminService {
    private readonly teacherService;
    private readonly studentService;
    private readonly teacherRepository;
    private readonly studentRepository;
    constructor(teacherService: TeacherService, studentService: StudentService, teacherRepository: Repository<Teacher>, studentRepository: Repository<Student>);
    suspendTeacher(teacher_id: number): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    suspendStudent(student_id: number): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
