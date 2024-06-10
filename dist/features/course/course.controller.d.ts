import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
export declare class CourseController {
    private readonly courseService;
    constructor(courseService: CourseService);
    create(createCourseDto: CreateCourseDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateCourseDto: UpdateCourseDto): string;
    remove(id: string): string;
}
