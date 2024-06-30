import {
  isDate,
  IsDate,
  IsEmpty,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsTimeZone,
} from 'class-validator';
import { OtpPurpose } from 'src/features/enums/otpEnum';
import { Column, Timestamp } from 'typeorm';

export class OtpVerifierDto {
  @IsNotEmpty()
  otp: number;

  @IsEnum(OtpPurpose)
  purpose: OtpPurpose;

  @IsDate()
  createdAt: Date;

  @IsDate()
  expiresAt: Date;
}
