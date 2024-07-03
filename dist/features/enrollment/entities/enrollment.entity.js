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
exports.Enrollment = void 0;
const course_entity_1 = require("../../course/entities/course.entity");
const enrollmentStatus_1 = require("../../enums/enrollmentStatus");
const student_entity_1 = require("../../student/entities/student.entity");
const typeorm_1 = require("typeorm");
let Enrollment = class Enrollment {
};
exports.Enrollment = Enrollment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Enrollment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Enrollment.prototype, "enrollmentDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enrollmentStatus_1.EnrollmentStatus,
        default: enrollmentStatus_1.EnrollmentStatus.active,
    }),
    __metadata("design:type", String)
], Enrollment.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
        default: null,
        onUpdate: 'CURRENT_DATE',
    }),
    __metadata("design:type", Date)
], Enrollment.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => student_entity_1.Student, (student) => student.enrollments),
    (0, typeorm_1.JoinColumn)({ name: 'student_id' }),
    __metadata("design:type", student_entity_1.Student)
], Enrollment.prototype, "student", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => course_entity_1.Course, (course) => course.enrollments),
    (0, typeorm_1.JoinColumn)({ name: 'course_id' }),
    __metadata("design:type", course_entity_1.Course)
], Enrollment.prototype, "course", void 0);
exports.Enrollment = Enrollment = __decorate([
    (0, typeorm_1.Entity)()
], Enrollment);
//# sourceMappingURL=enrollment.entity.js.map