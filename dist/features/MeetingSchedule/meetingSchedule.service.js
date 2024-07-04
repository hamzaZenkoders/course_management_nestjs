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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.meetingScheduleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const teacher_service_1 = require("../teacher/teacher.service");
const meetingSchedule_entity_1 = require("./entity/meetingSchedule.entity");
const meetingStatus_1 = require("../enums/meetingStatus");
const student_entity_1 = require("../student/entities/student.entity");
const teacher_entity_1 = require("../teacher/entities/teacher.entity");
const student_service_1 = require("../student/student.service");
let meetingScheduleService = class meetingScheduleService {
    constructor(meetingSchedulepository, teacherService, studentService, studentrepository, teacherrepository) {
        this.meetingSchedulepository = meetingSchedulepository;
        this.teacherService = teacherService;
        this.studentService = studentService;
        this.studentrepository = studentrepository;
        this.teacherrepository = teacherrepository;
    }
    async bookMeetinngSlot(bookSlotDto) {
        const teacher = await this.teacherService.findByID(bookSlotDto.teacher_id);
        if (!teacher) {
            throw new common_1.HttpException('Teacher not found', common_1.HttpStatus.NOT_FOUND);
        }
        const student = await this.studentService.findByID(bookSlotDto.student_id);
        if (!student) {
            throw new common_1.HttpException('Student not found', common_1.HttpStatus.NOT_FOUND);
        }
        const slotStart = new Date(bookSlotDto.slot_start);
        const slotEnd = new Date(bookSlotDto.slot_end);
        const meeting = new meetingSchedule_entity_1.MeetingSchedule();
        meeting.status = meetingStatus_1.MeetingStatus.pending;
        meeting.slot_start = slotStart;
        meeting.slot_end = slotEnd;
        meeting.student = student;
        meeting.teacher = teacher;
        const meetingCreated = this.meetingSchedulepository.create(meeting);
        console.log(meetingCreated);
        const meetingSaved = await this.meetingSchedulepository.save(meetingCreated);
        return meetingSaved;
    }
    async approveReject(meetingConfirmationDto) {
        const meetingScheduleFound = await this.meetingSchedulepository.findOne({
            where: { id: meetingConfirmationDto.meetingSchedule_id },
        });
        console.log(meetingScheduleFound);
        if (meetingConfirmationDto.confirmation_status === 'APPROVED') {
            meetingScheduleFound.status = meetingStatus_1.MeetingStatus.approved;
            await this.meetingSchedulepository.save(meetingScheduleFound);
            return 'meeting has been approved';
        }
        if (meetingConfirmationDto.confirmation_status === 'REJECTED') {
            meetingScheduleFound.status = meetingStatus_1.MeetingStatus.rejected;
            await this.meetingSchedulepository.save(meetingScheduleFound);
            return 'meeting has been rejected';
        }
    }
};
exports.meetingScheduleService = meetingScheduleService;
exports.meetingScheduleService = meetingScheduleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(meetingSchedule_entity_1.MeetingSchedule)),
    __param(3, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __param(4, (0, typeorm_1.InjectRepository)(teacher_entity_1.Teacher)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        teacher_service_1.TeacherService,
        student_service_1.StudentService,
        typeorm_2.Repository,
        typeorm_2.Repository])
], meetingScheduleService);
//# sourceMappingURL=meetingSchedule.service.js.map