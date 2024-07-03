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

import { MailModule } from './core/mail/mail.module';
import { StudentVerificationMiddleware } from './core/middleware/studentVerficationMiddleware';
import { JwtModule } from '@nestjs/jwt';
import { OtpModule } from './core/otp/otp.module';
import { EnrollmentModule } from './features/enrollment/enrollment.module';
import { TeacherVerificationMiddleware } from './core/middleware/teacherVerificationMiddleware';
import { Admin } from './features/admin/entities/admin.entity';
import { meetingScheduleModule } from './features/MeetingSchedule/meetingSchedule.module';
import { MeetingSchedule } from './features/MeetingSchedule/entity/meetingSchedule.entity';
import { ChatMessage } from './core/chat/entity/chatMessage.entity';
import { Chat } from './core/chat/entity/chat.entity';
import { ChatModule } from './core/chat/chat.module';
import { StudentGateway } from './core/chat/gateways/student.gateway';
import { TeacherGateway } from './core/chat/gateways/teacher.gateway';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,

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
        ChatMessage,
        Chat,
        MeetingSchedule,
      ],
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
    meetingScheduleModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService, StudentGateway, TeacherGateway],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(StudentVerificationMiddleware)
      .forRoutes('auth/student/login'); // Applying StudentVerificationMiddleware to '/student/auth/login' route

    consumer
      .apply(TeacherVerificationMiddleware)
      .forRoutes('auth/teacher/login'); // Applying TeacherVerificationMiddleware to '/teacher/auth/login' route
  }
}
