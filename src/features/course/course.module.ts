import { Module, forwardRef } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { StudentModule } from '../student/student.module';
import { Student } from '../student/entities/student.entity';
import { Enrollment } from '../enrollment/entities/enrollment.entity';
import { EnrollmentModule } from '../enrollment/enrollment.module';
import { EnrollmentService } from '../enrollment/enrollment.service';
import { PurchaseHistory } from '../purchase-history/entities/purchaseHistor.entity';
import { StripeModule } from 'src/core/stripe/stripe.module';

@Module({
  imports: [
    forwardRef(() => EnrollmentModule),
    forwardRef(() => StudentModule),
    TypeOrmModule.forFeature([Course, Enrollment, Student, PurchaseHistory]),
    StripeModule,
  ],
  controllers: [CourseController],
  providers: [CourseService, EnrollmentService],
  exports: [CourseService],
})
export class CourseModule {}
