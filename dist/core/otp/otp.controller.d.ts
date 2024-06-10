import { OtpService } from './otp.service';
import { OtpVerifierDto } from './dto/otp.verification';
export declare class MailController {
    private readonly otpService;
    constructor(otpService: OtpService);
    verify(otpVeriferDto: OtpVerifierDto): Promise<void>;
}
