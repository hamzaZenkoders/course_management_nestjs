import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './features/student/entities/student.entity';
import { Course } from './features/course/entities/course.entity';
import { Teacher } from './features/teacher/entities/teacher.entity';
import { Enrollment } from './features/enrollment/entities/enrollment.entity';
import { whiteListDomain } from './core/entities/whitlistedDomain.entity';
import { PassportModule } from '@nestjs/passport';
import { StudentModule } from './features/student/student.module';
import { CourseModule } from './features/course/course.module';
import { TeacherModule } from './features/teacher/teacher.module';
import { AuthModule } from './core/auth/auth.module';
import { OTP } from './core/entities/otp.entity';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './core/mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'dxtx998',
      database: 'lms',
      entities: [Student, Course, Teacher, Enrollment, whiteListDomain, OTP], //entity/*.js
      synchronize: true,
    }),
    AuthModule,
    StudentModule,
    PassportModule,
    CourseModule,
    TeacherModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
