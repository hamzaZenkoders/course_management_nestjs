import { IsDate, IsEmpty, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { EnrollmentStatus } from 'src/features/enums/enrollmentStatus';

export class CreateEnrollmentDto {
  @IsDate()
  @IsEmpty()
  EnrollmentDate: Date;

  @IsEnum(EnrollmentStatus)
  status: EnrollmentStatus;

  @IsDate() //
  updatedAt: Date;

  @IsNumber()
  @IsNotEmpty()
  studentId: number;

  @IsNumber()
  @IsNotEmpty()
  courseId: number;
}
