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
exports.StudentController = void 0;
const common_1 = require("@nestjs/common");
const student_service_1 = require("./student.service");
const roleAuthorization_guard_1 = require("../../core/guards/roleAuthorization.guard");
const authentication_guard_1 = require("../../core/guards/authentication.guard");
const roles_decorator_1 = require("../../core/decorator/roles.decorator");
const paginationSearch_dto_1 = require("../admin/dto/paginationSearch-dto");
let StudentController = class StudentController {
    constructor(studentService) {
        this.studentService = studentService;
    }
    GetStudentProfile(id) {
        return this.studentService.studentData(+id);
    }
    AllEnrolledCourses(id) {
        return this.studentService.studentAllEnrolledCourses(+id);
    }
    UpdateProfile(id, request) {
        const data = request.body;
        return this.studentService.updateStudentProfile(id, data);
    }
    GetAllStudents(paginationSearchDto) {
        return this.studentService.getAllStudents(paginationSearchDto);
    }
};
exports.StudentController = StudentController;
__decorate([
    (0, roles_decorator_1.Role)('STUDENT'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, roleAuthorization_guard_1.RoleAuthorizationGuard),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], StudentController.prototype, "GetStudentProfile", null);
__decorate([
    (0, roles_decorator_1.Role)('STUDENT'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, roleAuthorization_guard_1.RoleAuthorizationGuard),
    (0, common_1.Get)('/EnrolledCourses/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], StudentController.prototype, "AllEnrolledCourses", null);
__decorate([
    (0, roles_decorator_1.Role)('STUDENT'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, roleAuthorization_guard_1.RoleAuthorizationGuard),
    (0, common_1.Patch)('updateProfile/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Request]),
    __metadata("design:returntype", void 0)
], StudentController.prototype, "UpdateProfile", null);
__decorate([
    (0, roles_decorator_1.Role)('ADMIN', 'STUDENT'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, roleAuthorization_guard_1.RoleAuthorizationGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [paginationSearch_dto_1.PaginationSearchDto]),
    __metadata("design:returntype", void 0)
], StudentController.prototype, "GetAllStudents", null);
exports.StudentController = StudentController = __decorate([
    (0, common_1.Controller)('student'),
    __metadata("design:paramtypes", [student_service_1.StudentService])
], StudentController);
//# sourceMappingURL=student.controller.js.map