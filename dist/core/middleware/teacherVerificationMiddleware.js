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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeacherVerificationMiddleware = void 0;
const common_1 = require("@nestjs/common");
const teacher_service_1 = require("../../features/teacher/teacher.service");
let TeacherVerificationMiddleware = class TeacherVerificationMiddleware {
    constructor(teacherService) {
        this.teacherService = teacherService;
    }
    async use(req, res, next) {
        const { email } = req.body;
        console.log('Inside middleware');
        console.log(req.body);
        if (!req.body || !email) {
            throw new common_1.HttpException('Provide email address in the request body', common_1.HttpStatus.BAD_REQUEST);
        }
        try {
            const user = await this.teacherService.findOne(email);
            if (!user) {
                throw new common_1.HttpException('Teacher not found', common_1.HttpStatus.NOT_FOUND);
            }
            if (!user.is_Verified) {
                return res
                    .status(common_1.HttpStatus.UNAUTHORIZED)
                    .json({ message: 'Verify your OTP code' });
            }
            next();
        }
        catch (error) {
            throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
};
exports.TeacherVerificationMiddleware = TeacherVerificationMiddleware;
exports.TeacherVerificationMiddleware = TeacherVerificationMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [teacher_service_1.TeacherService])
], TeacherVerificationMiddleware);
//# sourceMappingURL=teacherVerificationMiddleware.js.map