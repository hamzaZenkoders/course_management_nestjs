import { Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AuthenticationGuard } from 'src/core/guards/authentication.guard';
import { RoleAuthorizationGuard } from 'src/core/guards/roleAuthorization.guard';
import { AvailableSlotService } from './availableSlot.service';
import { Role } from 'src/core/decorator/roles.decorator';

@Controller('availableSlots')
export class AvailableSlotController {
  constructor(private readonly availableSlotService: AvailableSlotService) {}

  @Get()
  @Role('STUDENT')
  @UseGuards(AuthenticationGuard, RoleAuthorizationGuard)
  getAvailableSlots(@Query('teacher_id') teacher_id: string) {
    console.log(typeof teacher_id);
    //return 'working';
    return this.availableSlotService.getAvailableSlotSerivce(+teacher_id);
  }
}
