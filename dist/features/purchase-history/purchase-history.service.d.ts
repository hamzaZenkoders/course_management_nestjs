import { CreatePurchaseHistoryDto } from './dto/create-purchase-history.dto';
import { UpdatePurchaseHistoryDto } from './dto/update-purchase-history.dto';
import { PurchaseHistory } from './entities/purchaseHistor.entity';
import { Repository } from 'typeorm';
export declare class PurchaseHistoryService {
    private purchasehistoryRespository;
    constructor(purchasehistoryRespository: Repository<PurchaseHistory>);
    create(createPurchaseHistoryDto: CreatePurchaseHistoryDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updatePurchaseHistoryDto: UpdatePurchaseHistoryDto): string;
    remove(id: number): string;
    findCourseHistory(courseId: number, studentId: number): Promise<PurchaseHistory>;
}
