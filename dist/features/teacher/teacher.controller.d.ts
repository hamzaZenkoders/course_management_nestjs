import { TeacherService } from './teacher.service';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { PaginationSearchDto } from '../admin/dto/paginationSearch-dto';
interface TeacherQueryParams {
    teacher_id: string;
    course_id: string;
}
export declare class TeacherController {
    private readonly teacherService;
    constructor(teacherService: TeacherService);
    GetTeacherProfile(id: number): Promise<import("./entities/teacher.entity").Teacher>;
    update(id: string, updateTeacherDto: UpdateTeacherDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    getTeacherCourseStudents(query: TeacherQueryParams): string;
    GetAllTeacher(paginationSearchDto: PaginationSearchDto): Promise<{
        data: import("./entities/teacher.entity").Teacher[];
        count: number;
    }>;
}
export {};
