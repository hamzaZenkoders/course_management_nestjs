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

@Module({
  imports: [TypeOrmModule.forFeature([Student, whiteListDomain, OTP]),MailModule],
  controllers: [StudentController],
  providers: [StudentService, AuthService, OtpService],
  exports: [StudentService],
})
export class StudentModule {}
