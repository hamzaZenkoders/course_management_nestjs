import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { AuthService } from 'src/core/auth/auth.service';
import { whiteListDomain } from 'src/core/entities/whitlistedDomain.entity';
import { OTP } from 'src/core/entities/otp.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, whiteListDomain, OTP])],
  controllers: [StudentController],
  providers: [StudentService, AuthService],
  exports: [StudentService],
})
export class StudentModule {}
