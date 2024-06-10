import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
export declare class TeacherController {
    private readonly teacherService;
    constructor(teacherService: TeacherService);
    create(createTeacherDto: CreateTeacherDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateTeacherDto: UpdateTeacherDto): string;
    remove(id: string): string;
}
