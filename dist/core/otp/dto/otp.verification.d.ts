import { OtpPurpose } from "src/features/enums/otpEnum";
export declare class OtpVerifierDto {
    otp: number;
    purpose: OtpPurpose;
    createdAt: Date;
    expiresAt: Date;
}
