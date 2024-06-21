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
//import { LalStrategy } from './local.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student, whiteListDomain, OTP]),
    MailModule,
    OtpModule,
    CourseModule,
    StudentModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
