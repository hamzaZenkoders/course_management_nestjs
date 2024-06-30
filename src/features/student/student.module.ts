import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { AuthService } from 'src/core/auth/auth.service';
import { whiteListDomain } from 'src/core/entities/whitlistedDomain.entity';
import { OTP } from 'src/core/otp/entity/otp.entity';
import { MailService } from 'src/core/mail/mail.service';
import { MailModule } from 'src/core/mail/mail.module';
import { OtpService } from 'src/core/otp/otp.service';
import { OtpModule } from 'src/core/otp/otp.module';
import { CourseModule } from '../course/course.module';
import { CourseService } from '../course/course.service';
import { Teacher } from '../teacher/entities/teacher.entity';
import { TeacherModule } from '../teacher/teacher.module';
import { Admin } from 'typeorm';
import { AdminModule } from '../admin/admin.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student, whiteListDomain, OTP, Teacher]),
    MailModule,
    OtpModule,
    CourseModule,
    TeacherModule,

    // AdminModule,
  ],
  controllers: [StudentController],
  providers: [StudentService, MailService],
  exports: [StudentService],
})
export class StudentModule {}
