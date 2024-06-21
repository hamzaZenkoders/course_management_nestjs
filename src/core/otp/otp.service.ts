import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

    console.log(findOtp);
    // if(findOtp[0].expiresAt > )
    const currentTime = new Date(Date.now());

    if (findOtp.length > 0 && findOtp[0].otp === otpVeriferDto.otp) {
      if (findOtp[0].expiresAt < currentTime) {
        throw new HttpException(
          'Otp is expired generate new otp',
          HttpStatus.FORBIDDEN,
        ); //
      }

      await this.studentRepo.update(findOtp[0].student.id, {
        is_Verified: true,
      });

      // console.log(verifiedStatusChanged);
    } else {
      throw new HttpException('Invalid OTP', HttpStatus.UNAUTHORIZED); //
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

    await this.otpRepository.save(newOtp);
  }

  async generateOTP() {
    const otp = await otpGen();
    return otp;
  }
}
