import { AvailableSlotService } from './availableSlot.service';
export declare class AvailableSlotController {
    private readonly availableSlotService;
    constructor(availableSlotService: AvailableSlotService);
    getAvailableSlots(teacher_id: string): Promise<import("./entity/availableSlots.entity").AvailableSlot>;
}
