// auth.service.ts
import { Injectable } from '@nestjs/common';
import { StudentService } from 'src/features/student/student.service';
import * as bcrypt from 'bcrypt';
//import { InjectRepository } from '@nestjs/typeorm';
//import { Repository } from 'typeorm';
//import { whiteListDomain } from '../entities/whitlistedDomain.entity';

@Injectable()
export class AuthService {
  constructor(
    private studentService: StudentService,
    //  @InjectRepository(whiteListDomain)
    // private whitelistedDomainRepository: Repository<whiteListDomain>,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.studentService.findOne(email);
    console.log('checkinggggg', user);

    if (user && password === user.password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
