import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { Student } from 'src/features/student/entities/student.entity';
export declare class RoleAuthorizationGuard implements CanActivate {
    private reflector;
    private readonly studentRepository;
    constructor(reflector: Reflector, studentRepository: Repository<Student>);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
