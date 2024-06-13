import { IsNotEmpty, IsNumber } from 'class-validator';
//import { EnrollmentStatus } from 'src/features/enums/enrollmentStatus';

export class RemoveEnrollmentDto {
  /*   @IsDate()
  EnrollmentDate: Date;

  @IsEnum(EnrollmentStatus)
  status: EnrollmentStatus;

  @IsDate() //
  updatedAt: Date;
 */
  @IsNumber()
  @IsNotEmpty()
  studentId: number;

  @IsNumber()
  @IsNotEmpty()
  courseID: number;
}
