import { Student } from 'src/features/student/entities/student.entity';
import { Teacher } from 'src/features/teacher/entities/teacher.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Chat } from './chat.entity';

@Entity()
export class ChatMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  message: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  messageTime: Date;

  @ManyToOne(() => Chat, (chat) => chat.messages)
  chat: Chat;
}
