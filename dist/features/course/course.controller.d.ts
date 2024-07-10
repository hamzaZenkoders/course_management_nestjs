import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { StripeService } from 'src/core/stripe/stripe.service';
import CustomRequest from './req.interface';
export declare class CourseController {
    private readonly courseService;
    private readonly stripeService;
    constructor(courseService: CourseService, stripeService: StripeService);
    create(createCourseDto: CreateCourseDto): Promise<import("./entities/course.entity").Course>;
    GetAllCourses(): Promise<import("./entities/course.entity").Course[]>;
    UpdateCourse(courseId: string, request: Request): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    removeCourse(id: string): Promise<void>;
    purchaseCourse(courseId: string, price: number, req: CustomRequest): Promise<{
        sessionHold: any;
        sessionUrl: any;
    }>;
    check(): string;
}
