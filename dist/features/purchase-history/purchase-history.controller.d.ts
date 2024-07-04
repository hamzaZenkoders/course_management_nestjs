import { PurchaseHistoryService } from './purchase-history.service';
import { CreatePurchaseHistoryDto } from './dto/create-purchase-history.dto';
import { UpdatePurchaseHistoryDto } from './dto/update-purchase-history.dto';
export declare class PurchaseHistoryController {
    private readonly purchaseHistoryService;
    constructor(purchaseHistoryService: PurchaseHistoryService);
    create(createPurchaseHistoryDto: CreatePurchaseHistoryDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updatePurchaseHistoryDto: UpdatePurchaseHistoryDto): string;
    remove(id: string): string;
}
