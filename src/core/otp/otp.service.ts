import { Injectable } from "@nestjs/common";
import { MailService } from "../mail/mail.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OTP } from "./entity/otp.entity";
import { OtpVerifierDto } from "./dto/otp.verification";
import { OtpPurpose } from "src/features/enums/otpEnum";


@Injectable()
export class OtpService{ 
   constructor(
   private readonly mailService: MailService,
   @InjectRepository(OTP)
   private otpRepository: Repository<OTP>){}

   async OtpVerification(){
    //  this.mailService.sendEmailOtp()
   }

   async saveOtp(linkedID: number, otp: number){
   
      const expiryTime = new Date(Date.now() + 24 * 60 * 60 * 1000); 
    

      const newOtp = this.otpRepository.create({
         otp: otp,
         purpose: OtpPurpose.signup, // Assuming you have a default purpose for signup
         expiresAt: expiryTime,
         student: { id: linkedID } // Pass the linkedID as student id
     });
   
      await this.otpRepository.save(newOtp);
      
   }

}