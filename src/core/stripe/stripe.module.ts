import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { CourseModule } from 'src/features/course/course.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/features/course/entities/course.entity';
import { PurchaseHistory } from 'src/features/purchase-history/entities/purchaseHistor.entity';
import { PurchaseHistoryModule } from 'src/features/purchase-history/purchase-history.module';
import { EnrollmentModule } from 'src/features/enrollment/enrollment.module';
import { Enrollment } from 'src/features/enrollment/entities/enrollment.entity';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course, PurchaseHistory, Enrollment]),
    MailModule,
  ],
  controllers: [StripeController],
  providers: [StripeService],
  exports: [StripeService],
})
export class StripeModule {}
