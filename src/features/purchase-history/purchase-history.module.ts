import { Module } from '@nestjs/common';
import { PurchaseHistoryService } from './purchase-history.service';
import { PurchaseHistoryController } from './purchase-history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseHistory } from './entities/purchaseHistor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PurchaseHistory])],
  controllers: [PurchaseHistoryController],
  providers: [PurchaseHistoryService],
  exports: [PurchaseHistoryService],
})
export class PurchaseHistoryModule {}
