//importing built in methods

import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository} from 'typeorm';

//importing DTOs

import { CreateStudentDto } from './dto/create-student.dto';
//import { UpdateStudentDto } from './dto/update-student.dto';


//importing bycrypt 

import * as bcrypt from 'bcrypt';

//importing entities

import { OTP } from 'src/core/otp/entity/otp.entity';
import { Student } from './entities/student.entity';

//importing services
import { MailService } from 'src/core/mail/mail.service';

//importing external package
import { otpGen } from 'otp-gen-agent';
import { OtpService } from 'src/core/otp/otp.service';
import { OtpVerifierDto } from 'src/core/otp/dto/otp.verification';
import { OtpPurpose } from '../enums/otpEnum';
import { LoginInStudentDto } from './dto/login-student-dto';


@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(OTP)
    private otpRepository: Repository<OTP>,


    private readonly mailService: MailService,
    private readonly otpService: OtpService
  ) {}

  async register(createStudentDto: CreateStudentDto) {
    //finding is student already exists
    const existingUser = await this.studentRepository.findOne({
      where: { email: createStudentDto.email },
    });

    console.log('check env', process.env.Sender_Email);
    if (existingUser) {
      throw new HttpException('Student already exists', HttpStatus.FORBIDDEN);
    }

    console.log(createStudentDto);
    const hashedPassword = await bcrypt.hash(createStudentDto.password, 10);

    const newStudent = this.studentRepository.create({
      ...createStudentDto,
      password: hashedPassword,
    }); //

    // to make sure id comes on top
    const tempSave = { id: newStudent.id, ...newStudent };

       //saving to database
    const savedStudent = await this.studentRepository.save(tempSave);

    //generating otp
       const otpRecieved = await this.otpService.generateOTP();
       const encryptedOtp = await bcrypt.hash(otpRecieved,10);


    if (savedStudent.isVerified === false) {

      //saving Otp in the otp table
      await this.otpService.saveOtp(savedStudent.id,encryptedOtp); 

      //sending otp
        await this.mailService.sendEmailOtp(tempSave.email,otpRecieved); //
      return {
        statusCode: HttpStatus.OK,
        message: 'Verification otp is sent to email',
      };
    } else {
   
      console.log('Student is verified:', savedStudent);

      return savedStudent;
    }
  }

  async login(loginInStudentDto: LoginInStudentDto){

    const existingUser = await this.studentRepository.findOne({
      where: { email: loginInStudentDto.email },
    });

    if(!existingUser){
      throw new NotFoundException('User not found');
    }
/* 
    if(existingUser.isVerified === false){
      throw new 
    } */
  }

  async findOne(email: string): Promise<Student | undefined> {
    const temp = await this.studentRepository.findOne({ where: { email } });
    return temp;
  }
}
