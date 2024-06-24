import { Module, MiddlewareConsumer } from '@nestjs/common';
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
import { OTP } from './core/otp/entity/otp.entity';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './core/mail/mail.module';
import { StudentVerificationMiddleware } from './core/middleware/verficationMiddleware';
import { JwtModule } from '@nestjs/jwt';
import { OtpModule } from './core/otp/otp.module';
import { AvailableSlot } from './features/teacher/entities/availableSlots.entity';
import { EnrollmentModule } from './features/enrollment/enrollment.module';
import { TeacherVerificationMiddleware } from './core/middleware/teacherVerificationMiddleware';
import { Admin } from './features/admin/entities/admin.entity';

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
      entities: [
        Student,
        Course,
        Teacher,
        Enrollment,
        whiteListDomain,
        Admin,
        OTP,
        AvailableSlot,
      ], //entity/*.js
      synchronize: true,
    }),

    JwtModule.register({
      global: true,
      secret: 'secret1100',
      signOptions: { expiresIn: '2h' },
    }),

    AuthModule,
    StudentModule,
    PassportModule,
    CourseModule,
    TeacherModule,
    EnrollmentModule,
    MailModule,
    OtpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(StudentVerificationMiddleware)
      .forRoutes('student/auth/login'); // Apply StudentVerificationMiddleware to '/student/auth/login' route

    consumer
      .apply(TeacherVerificationMiddleware)
      .forRoutes('teacher/auth/login'); // Apply TeacherVerificationMiddleware to '/teacher/auth/login' route
  }
}
