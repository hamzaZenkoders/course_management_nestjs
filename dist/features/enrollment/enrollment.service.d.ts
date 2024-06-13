import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { CourseService } from '../course/course.service';
import { StudentService } from '../student/student.service';
import { CreateEnrollmentDto } from './dto/create-enrollment-dto';
import { Enrollment } from './entities/enrollment.entity';
import { Repository } from 'typeorm';
export declare class EnrollmentService {
    private enrollmentRepository;
    private courseService;
    private studentService;
    constructor(enrollmentRepository: Repository<Enrollment>, courseService: CourseService, studentService: StudentService);
    create(createEnrollmentDto: CreateEnrollmentDto): string;
    findAll(): string;
    update(id: number, updateEnrollmentDto: UpdateEnrollmentDto): string;
    remove(id: number): string;
    creatEnrollment(createEnrollmentDto: CreateEnrollmentDto): Promise<Enrollment>;
    removeEnrollment(enrollmentID: number): Promise<void>;
    findOne(id: number): Promise<Enrollment>;
}
