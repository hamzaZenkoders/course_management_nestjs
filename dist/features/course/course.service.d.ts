import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';
export declare class CourseService {
    private courseRepository;
    constructor(courseRepository: Repository<Course>);
    create(createCourseDto: CreateCourseDto): string;
    findAll(): string;
    findOne(id: number): Promise<Course | undefined>;
    update(id: number, updateCourseDto: UpdateCourseDto): string;
    remove(id: number): string;
}
