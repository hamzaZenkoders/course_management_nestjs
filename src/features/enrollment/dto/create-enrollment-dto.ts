import { IsDate, IsEmpty, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { EnrollmentStatus } from 'src/features/enums/enrollmentStatus';

export class CreateEnrollmentDto {
  @IsEnum(EnrollmentStatus)
  status: EnrollmentStatus;

  @IsDate()
  updatedAt: Date;

  @IsNumber()
  @IsNotEmpty()
  student_id: number;

  @IsNumber()
  @IsNotEmpty()
  course_id: number;
}
