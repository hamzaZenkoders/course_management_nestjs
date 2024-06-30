import { Student } from 'src/features/student/entities/student.entity';
import { Teacher } from 'src/features/teacher/entities/teacher.entity';
import { ChatMessage } from './chatMessage.entity';
export declare class Chat {
    id: number;
    teacher: Teacher;
    student: Student;
    messages: ChatMessage[];
}
