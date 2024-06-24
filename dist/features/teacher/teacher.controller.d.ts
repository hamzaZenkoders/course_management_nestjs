import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
interface TeacherQueryParams {
    teacher_id: string;
    course_id: string;
}
export declare class TeacherController {
    private readonly teacherService;
    constructor(teacherService: TeacherService);
    create(createTeacherDto: CreateTeacherDto): string;
    GetTeacherProfile(id: number): Promise<import("./entities/teacher.entity").Teacher>;
    update(id: string, updateTeacherDto: UpdateTeacherDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    getTeacherCourseStudents(query: TeacherQueryParams): string;
    GetAllStudents(): Promise<import("./entities/teacher.entity").Teacher[]>;
    remove(id: string): string;
}
export {};
