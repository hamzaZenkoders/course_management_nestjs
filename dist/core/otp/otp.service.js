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
exports.OtpService = void 0;
const common_1 = require("@nestjs/common");
const mail_service_1 = require("../mail/mail.service");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const otp_entity_1 = require("./entity/otp.entity");
const otpEnum_1 = require("../../features/enums/otpEnum");
const otp_gen_agent_1 = require("otp-gen-agent");
let OtpService = class OtpService {
    constructor(mailService, otpRepository) {
        this.mailService = mailService;
        this.otpRepository = otpRepository;
    }
    async OtpVerification(otpVeriferDto) {
        const findOtp = await this.otpRepository.find({ where: { otp: otpVeriferDto.otp } });
    }
    async saveOtp(linkedID, otp) {
        const expiryTime = new Date(Date.now() + 24 * 60 * 60 * 1000);
        const newOtp = this.otpRepository.create({
            otp: otp,
            purpose: otpEnum_1.OtpPurpose.signup,
            expiresAt: expiryTime,
            student: { id: linkedID }
        });
        await this.otpRepository.save(newOtp);
    }
    async generateOTP() {
        const otp = await (0, otp_gen_agent_1.otpGen)();
        return otp;
    }
};
exports.OtpService = OtpService;
exports.OtpService = OtpService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(otp_entity_1.OTP)),
    __metadata("design:paramtypes", [mail_service_1.MailService,
        typeorm_2.Repository])
], OtpService);
//# sourceMappingURL=otp.service.js.map