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
exports.RoleAuthorizationGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const roles_decorator_1 = require("../decorator/roles.decorator");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const student_entity_1 = require("../../features/student/entities/student.entity");
let RoleAuthorizationGuard = class RoleAuthorizationGuard {
    constructor(reflector, studentRepository) {
        this.reflector = reflector;
        this.studentRepository = studentRepository;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const requiredRole = this.reflector.getAllAndOverride(roles_decorator_1.ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        console.log('INSIDE AUTHORIZATION GUARD');
        console.log(requiredRole);
        const userRole = request.user.role;
        console.log(userRole);
        if (requiredRole !== userRole)
            return false;
        return true;
    }
};
exports.RoleAuthorizationGuard = RoleAuthorizationGuard;
exports.RoleAuthorizationGuard = RoleAuthorizationGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __metadata("design:paramtypes", [core_1.Reflector,
        typeorm_2.Repository])
], RoleAuthorizationGuard);
//# sourceMappingURL=roleAuthorization.guard.js.map