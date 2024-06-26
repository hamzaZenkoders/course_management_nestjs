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
exports.MeetingSchedule = void 0;
const typeorm_1 = require("typeorm");
const teacher_entity_1 = require("../../teacher/entities/teacher.entity");
const student_entity_1 = require("../../student/entities/student.entity");
const meetingStatus_1 = require("../../enums/meetingStatus");
let MeetingSchedule = class MeetingSchedule {
};
exports.MeetingSchedule = MeetingSchedule;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], MeetingSchedule.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: meetingStatus_1.MeetingStatus,
        default: meetingStatus_1.MeetingStatus.pending,
    }),
    __metadata("design:type", String)
], MeetingSchedule.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], MeetingSchedule.prototype, "slot_start", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], MeetingSchedule.prototype, "slot_end", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => student_entity_1.Student, (student) => student.meetingSchedules),
    (0, typeorm_1.JoinColumn)({ name: 'student_id' }),
    __metadata("design:type", student_entity_1.Student)
], MeetingSchedule.prototype, "student", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => teacher_entity_1.Teacher, (teacher) => teacher.meetingSchedules),
    (0, typeorm_1.JoinColumn)({ name: 'teacher_id' }),
    __metadata("design:type", teacher_entity_1.Teacher)
], MeetingSchedule.prototype, "teacher", void 0);
exports.MeetingSchedule = MeetingSchedule = __decorate([
    (0, typeorm_1.Entity)()
], MeetingSchedule);
//# sourceMappingURL=meetingSchedule.entity.js.map