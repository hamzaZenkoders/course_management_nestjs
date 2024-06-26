import { AvailableSlotService } from './availableSlot.service';
export declare class AvailableSlotController {
    private readonly availableSlotService;
    constructor(availableSlotService: AvailableSlotService);
    createSlot(): void;
    getAvailableSlots(teacher_id: string): Promise<any>;
}
