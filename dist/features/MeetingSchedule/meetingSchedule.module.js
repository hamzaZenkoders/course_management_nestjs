"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.meetingScheduleModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const meetingSchedule_entity_1 = require("./entity/meetingSchedule.entity");
const meetingSchedule_controller_1 = require("./meetingSchedule.controller");
const meetingSchedule_service_1 = require("./meetingSchedule.service");
const student_entity_1 = require("../student/entities/student.entity");
let meetingScheduleModule = class meetingScheduleModule {
};
exports.meetingScheduleModule = meetingScheduleModule;
exports.meetingScheduleModule = meetingScheduleModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([meetingSchedule_entity_1.MeetingSchedule, student_entity_1.Student])],
        controllers: [meetingSchedule_controller_1.meetingScheduleController],
        providers: [meetingSchedule_service_1.meetingScheduleService],
        exports: [meetingSchedule_service_1.meetingScheduleService],
    })
], meetingScheduleModule);
//# sourceMappingURL=meetingSchedule.module.js.map