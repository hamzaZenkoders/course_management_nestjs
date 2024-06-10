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
const create_student_dto_1 = require("./dto/create-student.dto");
const emailAuthorization_guard_1 = require("../../core/guards/emailAuthorization.guard");
const login_student_dto_1 = require("./dto/login-student-dto");
let StudentController = class StudentController {
    constructor(studentService) {
        this.studentService = studentService;
    }
    create(createStudentDto) {
        return this.studentService.register(createStudentDto);
    }
    signIn(loginInStudentDto) {
        return this.studentService.login(loginInStudentDto);
    }
    getData() {
        return 'working correctly';
    }
    getDataTwo(createStudentDto) {
        return this.studentService.findOne(createStudentDto.email);
    }
};
exports.StudentController = StudentController;
__decorate([
    (0, common_1.Post)('/auth/signup'),
    (0, common_1.UseGuards)(emailAuthorization_guard_1.EmailAuthorizationGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_student_dto_1.CreateStudentDto]),
    __metadata("design:returntype", void 0)
], StudentController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('/auth/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_student_dto_1.LoginInStudentDto]),
    __metadata("design:returntype", void 0)
], StudentController.prototype, "signIn", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StudentController.prototype, "getData", null);
__decorate([
    (0, common_1.Get)('/second'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_student_dto_1.CreateStudentDto]),
    __metadata("design:returntype", void 0)
], StudentController.prototype, "getDataTwo", null);
exports.StudentController = StudentController = __decorate([
    (0, common_1.Controller)('student'),
    __metadata("design:paramtypes", [student_service_1.StudentService])
], StudentController);
//# sourceMappingURL=student.controller.js.map