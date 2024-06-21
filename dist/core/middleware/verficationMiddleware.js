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
exports.VerificationMiddleware = void 0;
const common_1 = require("@nestjs/common");
const student_service_1 = require("../../features/student/student.service");
let VerificationMiddleware = class VerificationMiddleware {
    constructor(studentService) {
        this.studentService = studentService;
    }
    async use(req, res, next) {
        const { email } = req.body;
        console.log('Inside middleware');
        console.log(req.body);
        if (!req.body) {
            throw new common_1.HttpException('Provide email address and password', common_1.HttpStatus.FORBIDDEN);
        }
        if (email) {
            const user = await this.studentService.findOne(email);
            if (user) {
                if (user.is_Verified === false) {
                    res
                        .status(common_1.HttpStatus.UNAUTHORIZED)
                        .json({ message: 'Verify your otp code' });
                }
                else {
                    next();
                }
            }
        }
    }
};
exports.VerificationMiddleware = VerificationMiddleware;
exports.VerificationMiddleware = VerificationMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [student_service_1.StudentService])
], VerificationMiddleware);
//# sourceMappingURL=verficationMiddleware.js.map