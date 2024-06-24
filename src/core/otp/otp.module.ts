import { Module } from '@nestjs/common';
import { MailService } from '../mail/mail.service';
import { OtpService } from './otp.service';
import { StudentService } from 'src/features/student/student.service';
import { StudentModule } from 'src/features/student/student.module';
import { OtpController } from './otp.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OTP } from './entity/otp.entity';
import { Student } from 'src/features/student/entities/student.entity';
import { MailModule } from '../mail/mail.module';
import { Teacher } from 'src/features/teacher/entities/teacher.entity';
import { TeacherModule } from 'src/features/teacher/teacher.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OTP, Student, Teacher]),
    MailModule,
    TeacherModule,
    //  StudentModule,
  ],
  controllers: [OtpController],
  providers: [OtpService],
  exports: [OtpService],
})
export class OtpModule {}
