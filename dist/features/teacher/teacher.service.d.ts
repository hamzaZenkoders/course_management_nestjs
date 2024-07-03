import { HttpStatus } from '@nestjs/common';
import { Teacher } from './entities/teacher.entity';
import { Repository } from 'typeorm';
import { PaginationSearchDto } from '../admin/dto/paginationSearch-dto';
export declare class TeacherService {
    private teacherRepository;
    constructor(teacherRepository: Repository<Teacher>);
    TeacherData(id: number): Promise<Teacher>;
    updateTeacherProfile(id: number, updatingData: Object): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    findAllTeachers(paginationSearchDto: PaginationSearchDto): Promise<{
        data: Teacher[];
        count: number;
    }>;
    findOne(email: string): Promise<Teacher | undefined>;
    findByID(id: number): Promise<Teacher | undefined>;
}
