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
exports.meetingScheduleController = void 0;
const common_1 = require("@nestjs/common");
const meetingSchedule_service_1 = require("./meetingSchedule.service");
const bookslot_dto_1 = require("./dto/bookslot-dto");
const meetingConfirmation_dto_1 = require("./dto/meetingConfirmation-dto");
const roles_decorator_1 = require("../../core/decorator/roles.decorator");
const authentication_guard_1 = require("../../core/guards/authentication.guard");
const roleAuthorization_guard_1 = require("../../core/guards/roleAuthorization.guard");
let meetingScheduleController = class meetingScheduleController {
    constructor(meetingScheduleService) {
        this.meetingScheduleService = meetingScheduleService;
    }
    bookSlot(bookSlotDto) {
        return this.meetingScheduleService.bookMeetinngSlot(bookSlotDto);
    }
    ApproveRejectMeeting(meetingConfirmationDto) {
        return this.meetingScheduleService.approveReject(meetingConfirmationDto);
    }
};
exports.meetingScheduleController = meetingScheduleController;
__decorate([
    (0, roles_decorator_1.Role)('STUDENT'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, roleAuthorization_guard_1.RoleAuthorizationGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bookslot_dto_1.BookSlotDto]),
    __metadata("design:returntype", void 0)
], meetingScheduleController.prototype, "bookSlot", null);
__decorate([
    (0, roles_decorator_1.Role)('TEACHER'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, roleAuthorization_guard_1.RoleAuthorizationGuard),
    (0, common_1.Post)('/confirmation'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [meetingConfirmation_dto_1.MeetingConfirmationDto]),
    __metadata("design:returntype", void 0)
], meetingScheduleController.prototype, "ApproveRejectMeeting", null);
exports.meetingScheduleController = meetingScheduleController = __decorate([
    (0, common_1.Controller)('meetingSchedule'),
    __metadata("design:paramtypes", [meetingSchedule_service_1.meetingScheduleService])
], meetingScheduleController);
//# sourceMappingURL=meetingSchedule.controller.js.map