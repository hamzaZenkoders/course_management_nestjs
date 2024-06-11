import { Injectable } from '@nestjs/common';
import { MailService } from '../mail/mail.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OTP } from './entity/otp.entity';
import { OtpVerifierDto } from './dto/otp.verification';
import { OtpPurpose } from 'src/features/enums/otpEnum';

import { otpGen } from 'otp-gen-agent';
import { StudentService } from 'src/features/student/student.service';
import { Student } from 'src/features/student/entities/student.entity';

@Injectable()
export class OtpService {
  constructor(
    private readonly mailService: MailService,
    // private readonly studentService: StudentService,

    @InjectRepository(Student)
    private studentRepo: Repository<Student>,
    @InjectRepository(OTP)
    private otpRepository: Repository<OTP>,
  ) {}

  async OtpVerification(otpVeriferDto: OtpVerifierDto) {
    const findOtp = await this.otpRepository.find({
      where: { otp: otpVeriferDto.otp },
      relations: ['student'],
    });

    // if(findOtp[0].expiresAt > )
    console.log(new Date(Date.now()));

    if (findOtp[0].otp === otpVeriferDto.otp) {
      await this.studentRepo.find();
      //  await this.studentService.updateIsVerifiedStatus(findOtp[0].student.id ,true);
      await this.studentRepo.update(findOtp[0].student.id, {
        isVerified: true,
      });
      console.log(findOtp);
    } else {
    }
  }

  async saveOtp(linkedID: number, otp: number) {
    const expiryTime = new Date(Date.now() + 5 * 60 * 1000);

    const newOtp = this.otpRepository.create({
      otp: otp,
      purpose: OtpPurpose.signup,
      expiresAt: expiryTime,
      student: { id: linkedID },
      //
    });

    await this.otpRepository.save(newOtp); //
  }

  async generateOTP() {
    const otp = await otpGen();
    return otp;
  }
}
