import { StudentService } from './student.service';
export declare class StudentController {
    private readonly studentService;
    constructor(studentService: StudentService);
    GetStudentProfile(id: number): Promise<import("./entities/student.entity").Student>;
    AllEnrolledCourses(id: number): Promise<import("./entities/student.entity").Student[]>;
    EnrollInCourse(): string;
    UpdateProfile(id: number, request: Request): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
}
