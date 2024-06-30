// chatMessage-dto.ts
import { IsString, IsNumber } from 'class-validator';

export class ChatMessageDto {
  @IsString()
  message: string;

  @IsNumber()
  teacherId: number;

  @IsNumber()
  studentId: number;
}
