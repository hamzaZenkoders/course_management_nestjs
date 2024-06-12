import { Teacher } from 'src/features/teacher/entities/teacher.entity';
import { daysEnum } from '../../enums/days';
export declare class AvailableSlot {
    id: number;
    time: Date;
    day: daysEnum;
    availability: boolean;
    teacher: Teacher;
}
