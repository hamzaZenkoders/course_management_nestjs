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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const emailAuthorization_guard_1 = require("../guards/emailAuthorization.guard");
const create_student_dto_1 = require("../../features/student/dto/create-student.dto");
const login_student_dto_1 = require("../../features/student/dto/login-student-dto");
const create_teacher_dto_1 = require("../../features/teacher/dto/create-teacher.dto");
const login_teacher_dto_1 = require("../../features/teacher/dto/login-teacher-dto");
const create_admin_dto_1 = require("../../features/admin/dto/create-admin.dto");
const login_admin_dto_1 = require("../../features/admin/dto/login-admin-dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    create(createStudentDto) {
        return this.authService.register(createStudentDto);
    }
    signIn(loginInStudentDto) {
        return this.authService.login(loginInStudentDto);
    }
    TeacherSignUp(createTeacherDto) {
        return this.authService.registerTeacher(createTeacherDto);
    }
    TeacherSignIn(loginTeacherDto) {
        return this.authService.signInTeacher(loginTeacherDto);
    }
    AdminSignUp(createAdminDto) {
        return this.authService.registerAdmin(createAdminDto);
    }
    AdminSignIn(loginAdminDto) {
        return this.authService.signInAdmin(loginAdminDto);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('/student/signup'),
    (0, common_1.UseGuards)(emailAuthorization_guard_1.EmailAuthorizationGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_student_dto_1.CreateStudentDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('/student/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_student_dto_1.LoginInStudentDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, common_1.Post)('/teacher/signup'),
    (0, common_1.UseGuards)(emailAuthorization_guard_1.EmailAuthorizationGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_teacher_dto_1.CreateTeacherDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "TeacherSignUp", null);
__decorate([
    (0, common_1.Post)('/teacher/login'),
    (0, common_1.UseGuards)(emailAuthorization_guard_1.EmailAuthorizationGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_teacher_dto_1.LoginInTeacherDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "TeacherSignIn", null);
__decorate([
    (0, common_1.Post)('/admin/signup'),
    (0, common_1.UseGuards)(emailAuthorization_guard_1.EmailAuthorizationGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_admin_dto_1.CreateAdminDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "AdminSignUp", null);
__decorate([
    (0, common_1.Post)('/admin/login'),
    (0, common_1.UseGuards)(emailAuthorization_guard_1.EmailAuthorizationGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_admin_dto_1.LoginInAdminDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "AdminSignIn", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map