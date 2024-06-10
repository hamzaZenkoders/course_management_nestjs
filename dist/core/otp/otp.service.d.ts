import { MailService } from "../mail/mail.service";
import { Repository } from "typeorm";
import { OTP } from "./entity/otp.entity";
import { OtpVerifierDto } from "./dto/otp.verification";
export declare class OtpService {
    private readonly mailService;
    private otpRepository;
    constructor(mailService: MailService, otpRepository: Repository<OTP>);
    OtpVerification(otpVeriferDto: OtpVerifierDto): Promise<void>;
    saveOtp(linkedID: number, otp: string): Promise<void>;
    generateOTP(): Promise<any>;
}
