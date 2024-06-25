import { Teacher } from 'src/features/teacher/entities/teacher.entity';
export declare class AvailableSlot {
    id: number;
    slot_start: Date;
    slot_end: Date;
    is_booked: boolean;
    availability: boolean;
    teacher: Teacher;
}
