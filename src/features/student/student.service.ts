import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryBuilder, Repository, createQueryBuilder } from 'typeorm';
//import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { OTP } from 'src/core/entities/otp.entity';

import { otpGen } from 'otp-gen-agent';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(OTP)
    private otpRepository: Repository<OTP>,
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
      isVerified: false,
      password: hashedPassword,
    }); //

    // to make sure id comes on top
    const tempSave = { id: newStudent.id, ...newStudent };

    if (tempSave.isVerified === false) {
      return {
        statusCode: HttpStatus.OK,
        message: 'Verification otp is sent to email',
      };
    } else {
      //saving to database
      const savedStudent = await this.studentRepository.save(tempSave);

      console.log('Student saved to database:', savedStudent);

      return savedStudent;
    }
  }

  async findOne(email: string): Promise<Student | undefined> {
    const temp = await this.studentRepository.findOne({ where: { email } });
    return temp;
  }
}
