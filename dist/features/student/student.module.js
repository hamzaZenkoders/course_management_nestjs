"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentModule = void 0;
const common_1 = require("@nestjs/common");
const student_service_1 = require("./student.service");
const student_controller_1 = require("./student.controller");
const typeorm_1 = require("@nestjs/typeorm");
const student_entity_1 = require("./entities/student.entity");
const auth_service_1 = require("../../core/auth/auth.service");
const whitlistedDomain_entity_1 = require("../../core/entities/whitlistedDomain.entity");
const otp_entity_1 = require("../../core/otp/entity/otp.entity");
const mail_module_1 = require("../../core/mail/mail.module");
const otp_service_1 = require("../../core/otp/otp.service");
let StudentModule = class StudentModule {
};
exports.StudentModule = StudentModule;
exports.StudentModule = StudentModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([student_entity_1.Student, whitlistedDomain_entity_1.whiteListDomain, otp_entity_1.OTP]), mail_module_1.MailModule],
        controllers: [student_controller_1.StudentController],
        providers: [student_service_1.StudentService, auth_service_1.AuthService, otp_service_1.OtpService],
        exports: [student_service_1.StudentService],
    })
], StudentModule);
//# sourceMappingURL=student.module.js.map