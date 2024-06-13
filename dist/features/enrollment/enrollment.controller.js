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
exports.EnrollmentController = void 0;
const common_1 = require("@nestjs/common");
const enrollment_service_1 = require("./enrollment.service");
const update_enrollment_dto_1 = require("./dto/update-enrollment.dto");
const create_enrollment_dto_1 = require("./dto/create-enrollment-dto");
const authentication_guard_1 = require("../../core/guards/authentication.guard");
const roleAuthorization_guard_1 = require("../../core/guards/roleAuthorization.guard");
const roles_decorator_1 = require("../../core/decorator/roles.decorator");
let EnrollmentController = class EnrollmentController {
    constructor(enrollmentService) {
        this.enrollmentService = enrollmentService;
    }
    findAll() {
        return this.enrollmentService.findAll();
    }
    create(createEnrollmentDto) {
        return this.enrollmentService.creatEnrollment(createEnrollmentDto);
    }
    remove(req) {
        const { enrollmentID } = req.body;
        return this.enrollmentService.removeEnrollment(enrollmentID);
    }
    findOne(id) {
        return this.enrollmentService.findOne(+id);
    }
    update(id, updateEnrollmentDto) {
        return this.enrollmentService.update(+id, updateEnrollmentDto);
    }
};
exports.EnrollmentController = EnrollmentController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EnrollmentController.prototype, "findAll", null);
__decorate([
    (0, roles_decorator_1.Role)('STUDENT'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, roleAuthorization_guard_1.RoleAuthorizationGuard),
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_enrollment_dto_1.CreateEnrollmentDto]),
    __metadata("design:returntype", void 0)
], EnrollmentController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)('/drop'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EnrollmentController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EnrollmentController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_enrollment_dto_1.UpdateEnrollmentDto]),
    __metadata("design:returntype", void 0)
], EnrollmentController.prototype, "update", null);
exports.EnrollmentController = EnrollmentController = __decorate([
    (0, common_1.Controller)('enrollment'),
    __metadata("design:paramtypes", [enrollment_service_1.EnrollmentService])
], EnrollmentController);
//# sourceMappingURL=enrollment.controller.js.map