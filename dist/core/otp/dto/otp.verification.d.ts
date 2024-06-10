import { OtpPurpose } from "src/features/enums/otpEnum";
import { Timestamp } from "typeorm";
export declare class OtpVerifierDto {
    otp: number;
    purpose: OtpPurpose;
    createdAt: Date;
    expiresAt: Timestamp;
}
