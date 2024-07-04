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
const roles_decorator_1 = require("../../core/decorator/roles.decorator");
const authentication_guard_1 = require("../../core/guards/authentication.guard");
const roleAuthorization_guard_1 = require("../../core/guards/roleAuthorization.guard");
const stripe_service_1 = require("../../core/stripe/stripe.service");
let CourseController = class CourseController {
    constructor(courseService, stripeService) {
        this.courseService = courseService;
        this.stripeService = stripeService;
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
    async purchaseCourse(courseId, price, req) {
        console.log(req.user);
        return 'working';
    }
    check() {
        console.log(process.env.DATABASE_PASSWORD);
        return 'working';
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
    (0, roles_decorator_1.Role)('STUDENT'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, roleAuthorization_guard_1.RoleAuthorizationGuard),
    (0, common_1.Post)(':courseId/purchase'),
    __param(0, (0, common_1.Param)('courseId')),
    __param(1, (0, common_1.Body)('price')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "purchaseCourse", null);
__decorate([
    (0, common_1.Get)('/aaaaa'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "check", null);
exports.CourseController = CourseController = __decorate([
    (0, common_1.Controller)('course'),
    __metadata("design:paramtypes", [course_service_1.CourseService,
        stripe_service_1.StripeService])
], CourseController);
//# sourceMappingURL=course.controller.js.map