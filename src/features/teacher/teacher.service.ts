import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Teacher } from './entities/teacher.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationSearchDto } from '../admin/dto/paginationSearch-dto';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
  ) {}

  //getting teacher data

  async TeacherData(id: number) {
    const teacher = await this.teacherRepository.findOne({ where: { id } });

    if (!teacher) {
      throw new NotFoundException();
    }
    return teacher;
  }

  //updating teacher profile
  async updateTeacherProfile(id: number, updatingData: Object) {
    const tempData = await this.teacherRepository.findOne({ where: { id } });

    if (!tempData) {
      throw new NotFoundException();
    }

    const updatedTeacher = { ...tempData, ...updatingData };

    console.log(updatedTeacher);

    const result = await this.teacherRepository.update(id, updatedTeacher);

    if (result.affected > 0) {
      return {
        statusCode: HttpStatus.OK,
        message: 'Teacher profile updated successfully',
      };
    } else {
      throw new HttpException(
        'Failed to update Teacher profile',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //all teacher using pagination
  async findAllTeachers(paginationSearchDto: PaginationSearchDto) {
    console.log(paginationSearchDto);
    try {
      let { page, limit, search } = paginationSearchDto;

      if (!page || !limit) {
        page = 1;
        limit = 3;
      }
      const query = this.teacherRepository.createQueryBuilder('student');

      if (search) {
        query.where(
          'student.username LIKE :search OR student.email LIKE :search',
          { search: `%${search}%` },
        );
      }

      const [result, total] = await query
        .skip((page - 1) * limit)
        .take(limit)
        .getManyAndCount();

      return {
        data: result,
        count: total,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(email: string): Promise<Teacher | undefined> {
    const temp = await this.teacherRepository.findOne({ where: { email } });
    return temp;
  }

  async findByID(id: number): Promise<Teacher | undefined> {
    const temp = await this.teacherRepository.findOne({ where: { id } });
    return temp;
  }
}
