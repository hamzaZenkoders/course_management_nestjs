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
exports.MailController = void 0;
const common_1 = require("@nestjs/common");
const otp_service_1 = require("./otp.service");
const otp_verification_1 = require("./dto/otp.verification");
let MailController = class MailController {
    constructor(otpService) {
        this.otpService = otpService;
    }
    verify(otpVeriferDto) {
        return this.otpService.OtpVerification();
    }
};
exports.MailController = MailController;
__decorate([
    (0, common_1.Post)('/verifyOtp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [otp_verification_1.OtpVerifierDto]),
    __metadata("design:returntype", void 0)
], MailController.prototype, "verify", null);
exports.MailController = MailController = __decorate([
    (0, common_1.Controller)('Otp'),
    __metadata("design:paramtypes", [otp_service_1.OtpService])
], MailController);
//# sourceMappingURL=otp.controller.js.map