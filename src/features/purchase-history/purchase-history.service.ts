import { Injectable } from '@nestjs/common';
import { CreatePurchaseHistoryDto } from './dto/create-purchase-history.dto';
import { UpdatePurchaseHistoryDto } from './dto/update-purchase-history.dto';

@Injectable()
export class PurchaseHistoryService {
  create(createPurchaseHistoryDto: CreatePurchaseHistoryDto) {
    return 'This action adds a new purchaseHistory';
  }

  findAll() {
    return `This action returns all purchaseHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} purchaseHistory`;
  }

  update(id: number, updatePurchaseHistoryDto: UpdatePurchaseHistoryDto) {
    return `This action updates a #${id} purchaseHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} purchaseHistory`;
  }
}
