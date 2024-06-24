import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Admin } from './entities/admin.entity';
import { TeacherModule } from '../teacher/teacher.module';
import { Teacher } from '../teacher/entities/teacher.entity';
import { Student } from '../student/entities/student.entity';
import { StudentModule } from '../student/student.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin, Teacher, Student]),
    TeacherModule,
    StudentModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService, TypeOrmModule],
})
export class AdminModule {}
