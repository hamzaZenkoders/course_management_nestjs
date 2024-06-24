import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { StudentModule } from 'src/features/student/student.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'src/features/student/entities/student.entity';
import { whiteListDomain } from '../entities/whitlistedDomain.entity';
import { OTP } from '../otp/entity/otp.entity';
import { MailModule } from '../mail/mail.module';
import { OtpModule } from '../otp/otp.module';
import { CourseModule } from 'src/features/course/course.module';
import { Teacher } from 'src/features/teacher/entities/teacher.entity';
import { TeacherModule } from 'src/features/teacher/teacher.module';
import { Admin } from 'src/features/admin/entities/admin.entity';
import { AdminModule } from 'src/features/admin/admin.module';
//import { LalStrategy } from './local.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Admin,
      Student,
      whiteListDomain,
      OTP,
      Teacher,
      //Admin,
    ]),
    MailModule,
    OtpModule,
    CourseModule,
    StudentModule,
    AdminModule,
    TeacherModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
