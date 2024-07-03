"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const student_entity_1 = require("./features/student/entities/student.entity");
const course_entity_1 = require("./features/course/entities/course.entity");
const teacher_entity_1 = require("./features/teacher/entities/teacher.entity");
const enrollment_entity_1 = require("./features/enrollment/entities/enrollment.entity");
const whitlistedDomain_entity_1 = require("./core/entities/whitlistedDomain.entity");
const passport_1 = require("@nestjs/passport");
const student_module_1 = require("./features/student/student.module");
const course_module_1 = require("./features/course/course.module");
const teacher_module_1 = require("./features/teacher/teacher.module");
const auth_module_1 = require("./core/auth/auth.module");
const otp_entity_1 = require("./core/otp/entity/otp.entity");
const mail_module_1 = require("./core/mail/mail.module");
const studentVerficationMiddleware_1 = require("./core/middleware/studentVerficationMiddleware");
const jwt_1 = require("@nestjs/jwt");
const otp_module_1 = require("./core/otp/otp.module");
const enrollment_module_1 = require("./features/enrollment/enrollment.module");
const teacherVerificationMiddleware_1 = require("./core/middleware/teacherVerificationMiddleware");
const admin_entity_1 = require("./features/admin/entities/admin.entity");
const meetingSchedule_module_1 = require("./features/MeetingSchedule/meetingSchedule.module");
const meetingSchedule_entity_1 = require("./features/MeetingSchedule/entity/meetingSchedule.entity");
const chatMessage_entity_1 = require("./core/chat/entity/chatMessage.entity");
const chat_entity_1 = require("./core/chat/entity/chat.entity");
const chat_module_1 = require("./core/chat/chat.module");
const student_gateway_1 = require("./core/chat/gateways/student.gateway");
const teacher_gateway_1 = require("./core/chat/gateways/teacher.gateway");
const config_1 = require("@nestjs/config");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(studentVerficationMiddleware_1.StudentVerificationMiddleware)
            .forRoutes('auth/student/login');
        consumer
            .apply(teacherVerificationMiddleware_1.TeacherVerificationMiddleware)
            .forRoutes('auth/teacher/login');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: 'dxtx998',
                database: 'lms',
                entities: [
                    student_entity_1.Student,
                    course_entity_1.Course,
                    teacher_entity_1.Teacher,
                    enrollment_entity_1.Enrollment,
                    whitlistedDomain_entity_1.whiteListDomain,
                    admin_entity_1.Admin,
                    otp_entity_1.OTP,
                    chatMessage_entity_1.ChatMessage,
                    chat_entity_1.Chat,
                    meetingSchedule_entity_1.MeetingSchedule,
                ],
                synchronize: true,
            }),
            jwt_1.JwtModule.register({
                global: true,
                secret: 'secret1100',
                signOptions: { expiresIn: '2h' },
            }),
            auth_module_1.AuthModule,
            student_module_1.StudentModule,
            passport_1.PassportModule,
            course_module_1.CourseModule,
            teacher_module_1.TeacherModule,
            enrollment_module_1.EnrollmentModule,
            mail_module_1.MailModule,
            otp_module_1.OtpModule,
            meetingSchedule_module_1.meetingScheduleModule,
            chat_module_1.ChatModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, student_gateway_1.StudentGateway, teacher_gateway_1.TeacherGateway],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map