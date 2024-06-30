import { Student } from 'src/features/student/entities/student.entity';
import { Teacher } from 'src/features/teacher/entities/teacher.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChatMessage } from './chatMessage.entity';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Teacher, (teacher) => teacher.chats)
  @JoinColumn({ name: 'teacher_id' })
  teacher: Teacher;

  @ManyToOne(() => Student, (student) => student.chats)
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @OneToMany(() => ChatMessage, (message) => message.chat)
  messages: ChatMessage[];
}
