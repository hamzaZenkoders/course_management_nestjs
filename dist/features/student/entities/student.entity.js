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
exports.Student = void 0;
const typeorm_1 = require("typeorm");
const roles_1 = require("../../enums/roles");
const class_transformer_1 = require("class-transformer");
const otp_entity_1 = require("../../../core/otp/entity/otp.entity");
const enrollment_entity_1 = require("../../enrollment/entities/enrollment.entity");
const meetingSchedule_entity_1 = require("../../MeetingSchedule/entity/meetingSchedule.entity");
let Student = class Student {
};
exports.Student = Student;
__decorate([
    (0, class_transformer_1.Transform)((value) => value, { toPlainOnly: true }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Student.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Student.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Student.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Student.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Student.prototype, "age", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Student.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Student.prototype, "contact", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Student.prototype, "date_of_birth", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: roles_1.Roles,
        default: roles_1.Roles.student,
    }),
    __metadata("design:type", String)
], Student.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Student.prototype, "is_Verified", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Student.prototype, "is_Suspended", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
    }),
    __metadata("design:type", Date)
], Student.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        default: null,
    }),
    __metadata("design:type", Date)
], Student.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => otp_entity_1.OTP, (otp) => otp.student),
    __metadata("design:type", Array)
], Student.prototype, "otps", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => enrollment_entity_1.Enrollment, (enrollment) => enrollment.student),
    __metadata("design:type", Array)
], Student.prototype, "enrollments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => meetingSchedule_entity_1.MeetingSchedule, (meetingSchedule) => meetingSchedule.student),
    __metadata("design:type", Array)
], Student.prototype, "meetingSchedules", void 0);
exports.Student = Student = __decorate([
    (0, typeorm_1.Entity)()
], Student);
//# sourceMappingURL=student.entity.js.map