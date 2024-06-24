import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { AuthenticationGuard } from 'src/core/guards/authentication.guard';
import { RoleAuthorizationGuard } from 'src/core/guards/roleAuthorization.guard';
import { AdminService } from './admin.service';
import { Role } from 'src/core/decorator/roles.decorator';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Role('ADMIN')
  @UseGuards(AuthenticationGuard, RoleAuthorizationGuard)
  @Post('suspendTeacher/:teacherId')
  suspendTeacher(@Param('teacherId') teacherId: number) {
    return this.adminService.suspendTeacher(+teacherId);
  }

  @Role('ADMIN')
  @UseGuards(AuthenticationGuard, RoleAuthorizationGuard)
  @Post('suspendStudent/:studentId')
  suspendStudent(@Param('studentId') studentId: number) {
    return this.adminService.suspendStudent(+studentId);
  }
}
