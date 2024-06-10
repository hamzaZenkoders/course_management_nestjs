import { StudentService } from 'src/features/student/student.service';
export declare class AuthService {
    private studentService;
    constructor(studentService: StudentService);
    validateUser(email: string, password: string): Promise<any>;
}
