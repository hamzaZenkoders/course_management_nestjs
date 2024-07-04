import { Module, forwardRef } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { EnrollmentController } from './enrollment.controller';
import { StudentModule } from '../student/student.module';
import { CourseModule } from '../course/course.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enrollment } from './entities/enrollment.entity';
import { Student } from '../student/entities/student.entity';
import { Course } from '../course/entities/course.entity';
import { PurchaseHistory } from '../purchase-history/entities/purchaseHistor.entity';

@Module({
  imports: [
    forwardRef(() => CourseModule),
    forwardRef(() => StudentModule),
    TypeOrmModule.forFeature([Enrollment, Student, Course, PurchaseHistory]),
    //   StudentModule,
  ],
  controllers: [EnrollmentController],
  providers: [EnrollmentService],
})
export class EnrollmentModule {}
