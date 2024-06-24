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
exports.TeacherController = void 0;
const common_1 = require("@nestjs/common");
const teacher_service_1 = require("./teacher.service");
const create_teacher_dto_1 = require("./dto/create-teacher.dto");
const update_teacher_dto_1 = require("./dto/update-teacher.dto");
const roles_decorator_1 = require("../../core/decorator/roles.decorator");
const authentication_guard_1 = require("../../core/guards/authentication.guard");
const roleAuthorization_guard_1 = require("../../core/guards/roleAuthorization.guard");
let TeacherController = class TeacherController {
    constructor(teacherService) {
        this.teacherService = teacherService;
    }
    create(createTeacherDto) {
        return this.teacherService.create(createTeacherDto);
    }
    GetTeacherProfile(id) {
        return this.teacherService.TeacherData(+id);
    }
    update(id, updateTeacherDto) {
        return this.teacherService.updateTeacherProfile(+id, updateTeacherDto);
    }
    getTeacherCourseStudents(query) {
        console.log(query.course_id);
        return 'workings';
    }
    GetAllStudents() {
        return this.teacherService.findAll();
    }
    remove(id) {
        return this.teacherService.remove(+id);
    }
};
exports.TeacherController = TeacherController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_teacher_dto_1.CreateTeacherDto]),
    __metadata("design:returntype", void 0)
], TeacherController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.Role)('TEACHER'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, roleAuthorization_guard_1.RoleAuthorizationGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TeacherController.prototype, "GetTeacherProfile", null);
__decorate([
    (0, roles_decorator_1.Role)('TEACHER'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, roleAuthorization_guard_1.RoleAuthorizationGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_teacher_dto_1.UpdateTeacherDto]),
    __metadata("design:returntype", void 0)
], TeacherController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.Role)('TEACHER'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, roleAuthorization_guard_1.RoleAuthorizationGuard),
    (0, common_1.Post)('/studentsEnrol'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TeacherController.prototype, "getTeacherCourseStudents", null);
__decorate([
    (0, roles_decorator_1.Role)('ADMIN'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, roleAuthorization_guard_1.RoleAuthorizationGuard),
    (0, common_1.Get)('/allteachers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TeacherController.prototype, "GetAllStudents", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TeacherController.prototype, "remove", null);
exports.TeacherController = TeacherController = __decorate([
    (0, common_1.Controller)('teacher'),
    __metadata("design:paramtypes", [teacher_service_1.TeacherService])
], TeacherController);
//# sourceMappingURL=teacher.controller.js.map