import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { CreateEnrollmentDto } from './dto/create-enrollment-dto';
import { AuthenticationGuard } from 'src/core/guards/authentication.guard';
import { RoleAuthorizationGuard } from 'src/core/guards/roleAuthorization.guard';
import { Role } from 'src/core/decorator/roles.decorator';

@Controller('enrollment')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Get()
  findAll() {
    return this.enrollmentService.findAll();
  }

  @Role('STUDENT')
  @UseGuards(AuthenticationGuard, RoleAuthorizationGuard)
  @Post('/create')
  create(@Body() createEnrollmentDto: CreateEnrollmentDto) {
    return this.enrollmentService.creatEnrollment(createEnrollmentDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.enrollmentService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEnrollmentDto: UpdateEnrollmentDto,
  ) {
    return this.enrollmentService.update(+id, updateEnrollmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.enrollmentService.remove(+id);
  }
}
