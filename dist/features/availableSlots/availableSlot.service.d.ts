import { TeacherService } from '../teacher/teacher.service';
export declare class AvailableSlotService {
    private readonly teacherService;
    constructor(teacherService: TeacherService);
    getAvailableSlotSerivce(teacherID: number): Promise<any>;
}
