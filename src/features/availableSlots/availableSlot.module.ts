import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AvailableSlot } from './entity/availableSlots.entity';
import { AvailableSlotService } from './availableSlot.service';
import { AvailableSlotController } from './availableSlot.controller';
import { TeacherModule } from '../teacher/teacher.module';

@Module({
  imports: [TypeOrmModule.forFeature([AvailableSlot]), TeacherModule],
  controllers: [AvailableSlotController],
  providers: [AvailableSlotService],
  exports: [AvailableSlotService],
})
export class AvailableSlotModule {}
