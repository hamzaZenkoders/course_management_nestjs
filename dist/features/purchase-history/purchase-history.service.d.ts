import { CreatePurchaseHistoryDto } from './dto/create-purchase-history.dto';
import { UpdatePurchaseHistoryDto } from './dto/update-purchase-history.dto';
export declare class PurchaseHistoryService {
    create(createPurchaseHistoryDto: CreatePurchaseHistoryDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updatePurchaseHistoryDto: UpdatePurchaseHistoryDto): string;
    remove(id: number): string;
}
