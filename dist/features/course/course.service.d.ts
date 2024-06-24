import { HttpStatus } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';
import { EnrollmentService } from '../enrollment/enrollment.service';
export declare class CourseService {
    private courseRepository;
    private enrollmentService;
    constructor(courseRepository: Repository<Course>, enrollmentService: EnrollmentService);
    create(createCourseDto: CreateCourseDto): Promise<Course>;
    updateCourseContent(courseID: number, Updatingdata: Object): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    deleteCourse(id: number): Promise<void>;
    courseExists(courseName: string): Promise<boolean>;
    findAll(): Promise<Course[]>;
    findOne(id: number): Promise<Course | undefined>;
    update(id: number, updateCourseDto: UpdateCourseDto): string;
}
