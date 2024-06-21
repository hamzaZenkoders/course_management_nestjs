"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const student_module_1 = require("../../features/student/student.module");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const typeorm_1 = require("@nestjs/typeorm");
const student_entity_1 = require("../../features/student/entities/student.entity");
const whitlistedDomain_entity_1 = require("../entities/whitlistedDomain.entity");
const otp_entity_1 = require("../otp/entity/otp.entity");
const mail_module_1 = require("../mail/mail.module");
const otp_module_1 = require("../otp/otp.module");
const course_module_1 = require("../../features/course/course.module");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([student_entity_1.Student, whitlistedDomain_entity_1.whiteListDomain, otp_entity_1.OTP]),
            mail_module_1.MailModule,
            otp_module_1.OtpModule,
            course_module_1.CourseModule,
            student_module_1.StudentModule,
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map