import { IsNotEmpty, IsNumber } from 'class-validator';
//import { EnrollmentStatus } from 'src/features/enums/enrollmentStatus';

export class RemoveEnrollmentDto {
  @IsNumber()
  @IsNotEmpty()
  studentId: number;

  @IsNumber()
  @IsNotEmpty()
  courseID: number;
}
