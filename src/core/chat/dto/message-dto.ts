// chatMessage-dto.ts
import { IsNumber, IsString } from 'class-validator';

export class MessageDto {
  @IsString()
  message: string;

  @IsNumber()
  chatID: number;
}
