import { IsDate, IsEmpty, IsEnum, IsInt, IsNumber, IsString, IsTimeZone } from "class-validator";
import { OtpPurpose } from "src/features/enums/otpEnum";
import { Column, Timestamp } from "typeorm";



export class OtpVerifierDto {
    @IsInt()
    @IsEmpty()
    otp: number;
  
    @IsEnum(OtpPurpose)
    purpose: OtpPurpose;
   
    @IsDate()
    createdAt: Date;
  
   @IsTimeZone()
    expiresAt: Timestamp;

  
}
  