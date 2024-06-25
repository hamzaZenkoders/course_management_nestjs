import {
  HttpException,
  HttpStatus,
  Injectable,
  Param,
  Query,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeacherService } from '../teacher/teacher.service';
import { AvailableSlot } from './entity/availableSlots.entity';

@Injectable()
export class AvailableSlotService {
  constructor(
    private readonly teacherService: TeacherService,

    @InjectRepository(AvailableSlot)
    private readonly availableSlotRepository: Repository<AvailableSlot>,
  ) {}

  async getAvailableSlotSerivce(teacherID: number) {
    const teacherFound = await this.teacherService.findByID(teacherID);

    if (!teacherFound) {
      throw new HttpException('Teacher not found', HttpStatus.NOT_FOUND);
    }

    //it  will only show availbale slots that are not booked
    const slots = await this.availableSlotRepository.findOne({
      where: { teacher: { id: teacherID }, is_booked: false },
    });

    /*    const slots = await this.availableSlotRepository
      .createQueryBuilder('slot')
      .leftJoinAndSelect('slot.teacher', 'teacher')
      .where('teacher.id = :teacherID', { teacherID })
      .select([
        'slot.id',
        'slot.slot_start',
        'slot.slot_end',
        'slot.is_booked',
        'teacher.name',
      ])
      .getMany(); */

    return slots;
  }
}
