"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OTP = void 0;
const admin_entity_1 = require("../../../features/admin/entities/admin.entity");
const otpEnum_1 = require("../../../features/enums/otpEnum");
const student_entity_1 = require("../../../features/student/entities/student.entity");
const teacher_entity_1 = require("../../../features/teacher/entities/teacher.entity");
const typeorm_1 = require("typeorm");
let OTP = class OTP {
};
exports.OTP = OTP;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OTP.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], OTP.prototype, "otp", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: otpEnum_1.OtpPurpose,
    }),
    __metadata("design:type", String)
], OTP.prototype, "purpose", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], OTP.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
    }),
    __metadata("design:type", Date)
], OTP.prototype, "expiresAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => student_entity_1.Student, (student) => student.otps),
    __metadata("design:type", student_entity_1.Student)
], OTP.prototype, "student", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => teacher_entity_1.Teacher, (teacher) => teacher.otps),
    __metadata("design:type", teacher_entity_1.Teacher)
], OTP.prototype, "teacher", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => admin_entity_1.Admin, (admin) => admin.otps),
    __metadata("design:type", admin_entity_1.Admin)
], OTP.prototype, "admin", void 0);
exports.OTP = OTP = __decorate([
    (0, typeorm_1.Entity)()
], OTP);
//# sourceMappingURL=otp.entity.js.map