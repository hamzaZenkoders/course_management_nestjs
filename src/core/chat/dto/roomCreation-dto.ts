// chatMessage-dto.ts
import { IsString, IsNumber } from 'class-validator';

export class RoomCreationDto {
  @IsNumber()
  teacherId: number;

  @IsNumber()
  studentId: number;
}
