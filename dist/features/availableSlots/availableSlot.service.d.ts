import { Repository } from 'typeorm';
import { TeacherService } from '../teacher/teacher.service';
import { AvailableSlot } from './entity/availableSlots.entity';
export declare class AvailableSlotService {
    private readonly teacherService;
    private readonly availableSlotRepository;
    constructor(teacherService: TeacherService, availableSlotRepository: Repository<AvailableSlot>);
    getAvailableSlotSerivce(teacherID: number): Promise<AvailableSlot>;
}
