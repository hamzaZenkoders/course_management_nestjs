import { Module } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { EnrollmentController } from './enrollment.controller';
import { StudentModule } from '../student/student.module';
import { CourseModule } from '../course/course.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enrollment } from './entities/enrollment.entity';
import { Student } from '../student/entities/student.entity';
import { Course } from '../course/entities/course.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Enrollment, Student, Course]),
    StudentModule,
    CourseModule,
  ],
  controllers: [EnrollmentController],
  providers: [EnrollmentService],
})
export class EnrollmentModule {}
