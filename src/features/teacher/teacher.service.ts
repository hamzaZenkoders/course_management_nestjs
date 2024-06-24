import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Teacher } from './entities/teacher.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
  ) {}

  create(createTeacherDto: CreateTeacherDto) {
    return 'This action adds a new teacher';
  }

  async TeacherData(id: number) {
    const teacher = await this.teacherRepository.findOne({ where: { id } });

    if (!teacher) {
      throw new NotFoundException();
    }
    return teacher;
  }

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

    // console.log('updatedData', updatedData);
  }

  async getStudentsEnrolled(courseID: number, teacherID: number) {}

  async findAll() {
    const allTeacherResult = await this.teacherRepository.find();
    return allTeacherResult;
  }

  async findOne(email: string): Promise<Teacher | undefined> {
    const temp = await this.teacherRepository.findOne({ where: { email } });
    return temp;
  }

  async findByID(id: number): Promise<Teacher | undefined> {
    const temp = await this.teacherRepository.findOne({ where: { id } });
    return temp;
  }

  remove(id: number) {
    return `This action removes a #${id} teacher`;
  }
}
