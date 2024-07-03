import { CourseService } from '../course/course.service';
import { StudentService } from '../student/student.service';
import { CreateEnrollmentDto } from './dto/create-enrollment-dto';
import { Enrollment } from './entities/enrollment.entity';
import { Repository } from 'typeorm';
import { Student } from '../student/entities/student.entity';
export declare class EnrollmentService {
    private enrollmentRepository;
    private studentRepository;
    private courseService;
    private studentService;
    constructor(enrollmentRepository: Repository<Enrollment>, studentRepository: Repository<Student>, courseService: CourseService, studentService: StudentService);
    create(createEnrollmentDto: CreateEnrollmentDto): string;
    findAll(): string;
    remove(id: number): string;
    creatEnrollment(createEnrollmentDto: CreateEnrollmentDto): Promise<Enrollment>;
    removeEnrollment(enrollmentID: number): Promise<import("typeorm").DeleteResult>;
    hasEnrollments(courseId: number): Promise<boolean>;
    findOne(id: number): Promise<Enrollment>;
}
