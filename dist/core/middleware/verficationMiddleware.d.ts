import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { StudentService } from 'src/features/student/student.service';
export declare class VerificationMiddleware implements NestMiddleware {
    private readonly studentService;
    constructor(studentService: StudentService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
