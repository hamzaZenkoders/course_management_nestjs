import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TeacherService } from 'src/features/teacher/teacher.service';
export declare class TeacherVerificationMiddleware implements NestMiddleware {
    private readonly teacherService;
    constructor(teacherService: TeacherService);
    use(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
}
