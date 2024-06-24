import { HttpStatus } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { Teacher } from './entities/teacher.entity';
import { Repository } from 'typeorm';
export declare class TeacherService {
    private teacherRepository;
    constructor(teacherRepository: Repository<Teacher>);
    create(createTeacherDto: CreateTeacherDto): string;
    TeacherData(id: number): Promise<Teacher>;
    updateTeacherProfile(id: number, updatingData: Object): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    getStudentsEnrolled(courseID: number, teacherID: number): Promise<void>;
    findAll(): Promise<Teacher[]>;
    findOne(email: string): Promise<Teacher | undefined>;
    findByID(id: number): Promise<Teacher | undefined>;
    remove(id: number): string;
}
