import { Injectable } from "@nestjs/common";
import { MailService } from "../mail/mail.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OTP } from "./entity/otp.entity";
import { OtpVerifierDto } from "./dto/otp.verification";
import { OtpPurpose } from "src/features/enums/otpEnum";

import { otpGen } from 'otp-gen-agent';


@Injectable()
export class OtpService{ 
   constructor(
   private readonly mailService: MailService,
   @InjectRepository(OTP)
   private otpRepository: Repository<OTP>){}

   async OtpVerification(otpVeriferDto: OtpVerifierDto){
     const findOtp = await this.otpRepository.find({ where: { otp: otpVeriferDto.otp} });
   }

   async saveOtp(linkedID: number, otp: string){
   
      const expiryTime = new Date(Date.now() + 24 * 60 * 60 * 1000); 
    
      const newOtp = this.otpRepository.create({
         otp: otp,
         purpose: OtpPurpose.signup, // Assuming you have a default purpose for signup
         expiresAt: expiryTime,
         student: { id: linkedID } // Pass the linkedID as student id
     });
   
      await this.otpRepository.save(newOtp);//
      
   }

   async generateOTP(){
      const otp = await otpGen();
      return otp;
   }

}