import { Injectable } from '@nestjs/common';
import { CreatePurchaseHistoryDto } from './dto/create-purchase-history.dto';
import { UpdatePurchaseHistoryDto } from './dto/update-purchase-history.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PurchaseHistory } from './entities/purchaseHistor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PurchaseHistoryService {
  constructor(
    @InjectRepository(PurchaseHistory)
    private purchasehistoryRespository: Repository<PurchaseHistory>,
  ) {}

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

  async findCourseHistory(
    courseId: number,
    studentId: number,
  ): Promise<PurchaseHistory> {
    return await this.purchasehistoryRespository.findOne({
      where: { course: { id: courseId }, student: { id: studentId } },
    });
  }
}
