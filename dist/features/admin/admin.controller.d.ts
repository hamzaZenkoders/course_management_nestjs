import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    suspendTeacher(teacherId: number): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    suspendStudent(studentId: number): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
}
