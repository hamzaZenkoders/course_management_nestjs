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
exports.CourseController = void 0;
const common_1 = require("@nestjs/common");
const course_service_1 = require("./course.service");
const create_course_dto_1 = require("./dto/create-course.dto");
const update_course_dto_1 = require("./dto/update-course.dto");
const roles_decorator_1 = require("../../core/decorator/roles.decorator");
const authentication_guard_1 = require("../../core/guards/authentication.guard");
const roleAuthorization_guard_1 = require("../../core/guards/roleAuthorization.guard");
let CourseController = class CourseController {
    constructor(courseService) {
        this.courseService = courseService;
    }
    create(createCourseDto) {
        console.log(createCourseDto);
        return this.courseService.create(createCourseDto);
    }
    GetAllCourses() {
        return this.courseService.findAll();
    }
    UpdateCourse(courseId, request) {
        const data = request.body;
        console.log(+courseId);
        return this.courseService.updateCourseContent(+courseId, data);
    }
    removeCourse(id) {
        return this.courseService.deleteCourse(+id);
    }
    GetCourseFind() {
        return this.courseService.courseExists('Course4');
    }
    findOne(id) {
        return this.courseService.findOne(+id);
    }
    update(id, updateCourseDto) {
        return this.courseService.update(+id, updateCourseDto);
    }
};
exports.CourseController = CourseController;
__decorate([
    (0, roles_decorator_1.Role)('TEACHER'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, roleAuthorization_guard_1.RoleAuthorizationGuard),
    (0, common_1.Post)('/createCourse'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_course_dto_1.CreateCourseDto]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.Role)('TEACHER', 'ADMIN'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, roleAuthorization_guard_1.RoleAuthorizationGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "GetAllCourses", null);
__decorate([
    (0, roles_decorator_1.Role)('TEACHER'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, roleAuthorization_guard_1.RoleAuthorizationGuard),
    (0, common_1.Patch)('/update'),
    __param(0, (0, common_1.Query)('courseID')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Request]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "UpdateCourse", null);
__decorate([
    (0, roles_decorator_1.Role)('TEACHER'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, roleAuthorization_guard_1.RoleAuthorizationGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "removeCourse", null);
__decorate([
    (0, common_1.Get)('/courseCheck'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "GetCourseFind", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_course_dto_1.UpdateCourseDto]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "update", null);
exports.CourseController = CourseController = __decorate([
    (0, common_1.Controller)('course'),
    __metadata("design:paramtypes", [course_service_1.CourseService])
], CourseController);
//# sourceMappingURL=course.controller.js.map