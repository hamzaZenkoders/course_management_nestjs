import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
export declare class CourseController {
    private readonly courseService;
    constructor(courseService: CourseService);
    create(createCourseDto: CreateCourseDto): Promise<import("./entities/course.entity").Course>;
    GetAllCourses(): Promise<import("./entities/course.entity").Course[]>;
    UpdateCourse(courseId: string, request: Request): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    removeCourse(id: string): Promise<void>;
}
