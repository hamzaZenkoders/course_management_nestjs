import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PurchaseHistoryService } from './purchase-history.service';
import { CreatePurchaseHistoryDto } from './dto/create-purchase-history.dto';
import { UpdatePurchaseHistoryDto } from './dto/update-purchase-history.dto';

@Controller('purchase-history')
export class PurchaseHistoryController {
  constructor(private readonly purchaseHistoryService: PurchaseHistoryService) {}

  @Post()
  create(@Body() createPurchaseHistoryDto: CreatePurchaseHistoryDto) {
    return this.purchaseHistoryService.create(createPurchaseHistoryDto);
  }

  @Get()
  findAll() {
    return this.purchaseHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.purchaseHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePurchaseHistoryDto: UpdatePurchaseHistoryDto) {
    return this.purchaseHistoryService.update(+id, updatePurchaseHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.purchaseHistoryService.remove(+id);
  }
}
