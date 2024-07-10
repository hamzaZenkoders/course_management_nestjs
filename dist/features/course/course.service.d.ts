import { HttpStatus } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';
import { EnrollmentService } from '../enrollment/enrollment.service';
import { StripeService } from 'src/core/stripe/stripe.service';
export declare class CourseService {
    private courseRepository;
    private enrollmentService;
    private readonly stripeService;
    constructor(courseRepository: Repository<Course>, enrollmentService: EnrollmentService, stripeService: StripeService);
    create(createCourseDto: CreateCourseDto): Promise<Course>;
    updateCourseContent(courseID: number, Updatingdata: Object): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    deleteCourse(id: number): Promise<void>;
    buyPaidCourse(courseId: string, studentId: number, studentEmail: string, price: number): Promise<any>;
    courseExists(courseName: string): Promise<boolean>;
    findAll(): Promise<Course[]>;
    findOne(id: number): Promise<Course | undefined>;
    update(id: number, updateCourseDto: UpdateCourseDto): string;
}
