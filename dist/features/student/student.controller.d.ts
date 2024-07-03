import { StudentService } from './student.service';
import { PaginationSearchDto } from '../admin/dto/paginationSearch-dto';
export declare class StudentController {
    private readonly studentService;
    constructor(studentService: StudentService);
    GetStudentProfile(id: number): Promise<import("./entities/student.entity").Student>;
    AllEnrolledCourses(id: number): Promise<import("./entities/student.entity").Student[]>;
    UpdateProfile(id: number, request: Request): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    GetAllStudents(paginationSearchDto: PaginationSearchDto): Promise<{
        data: import("./entities/student.entity").Student[];
        count: number;
    }>;
}
