import { MailService } from "../mail/mail.service";
import { Repository } from "typeorm";
import { OTP } from "./entity/otp.entity";
export declare class OtpService {
    private readonly mailService;
    private otpRepository;
    constructor(mailService: MailService, otpRepository: Repository<OTP>);
    OtpVerification(): Promise<void>;
    saveOtp(linkedID: number, otp: number): Promise<void>;
}
