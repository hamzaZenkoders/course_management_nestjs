import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TeacherService } from '../teacher/teacher.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from '../teacher/entities/teacher.entity';
import { Repository } from 'typeorm';
import { StudentService } from '../student/student.service';
import { Student } from '../student/entities/student.entity';

@Injectable()
export class AdminService {
  constructor(
    private readonly teacherService: TeacherService,

    private readonly studentService: StudentService,

    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,

    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async suspendTeacher(teacher_id: number) {
    const foundTeacher = await this.teacherService.findByID(teacher_id);
    console.log(foundTeacher);

    if (!foundTeacher) {
      throw new HttpException(
        'Failed to update Teacher profile',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    //  console.log(foundTeacher);

    const updatedTeacherData = { ...foundTeacher, is_Suspended: true };

    const result = await this.teacherRepository.update(
      teacher_id,
      updatedTeacherData,
    );

    if (result.affected > 0) {
      return {
        statusCode: HttpStatus.OK,
        message: 'Teacher has been suspended',
      };
    } else {
      throw new HttpException(
        'Failed to suspend teacher',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async suspendStudent(student_id: number) {
    const foundStudent = await this.studentService.findByID(student_id);
    console.log(foundStudent);

    if (!foundStudent) {
      throw new HttpException(
        'Failed to update student profile',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    //  console.log(foundTeacher);

    const updatedStudentData = { ...foundStudent, is_Suspended: true };

    const result = await this.studentRepository.update(
      student_id,
      updatedStudentData,
    );

    if (result.affected > 0) {
      return {
        statusCode: HttpStatus.OK,
        message: 'Student has been suspended',
      };
    } else {
      throw new HttpException(
        'Failed to suspend student',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
