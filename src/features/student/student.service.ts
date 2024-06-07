import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class StudentService {

  constructor(
    @InjectRepository(Student)
     private studentRepository: Repository<Student>,

   ){}


  async register(createStudentDto: CreateStudentDto){
  
    const existingUser = await this.studentRepository.findOne({ where: { email: createStudentDto.email } });

    
    if (existingUser) {
        throw new HttpException('Student already exists', HttpStatus.FORBIDDEN);
    }

    console.log(createStudentDto);
    const hashedPassword = await bcrypt.hash(createStudentDto.password, 10);
    
    const newStudent = await this.studentRepository.create({...createStudentDto, password: hashedPassword});

    const savedStudent = await this.studentRepository.save(newStudent);

    console.log('Student saved to database:', savedStudent);

    return savedStudent;

}

}
