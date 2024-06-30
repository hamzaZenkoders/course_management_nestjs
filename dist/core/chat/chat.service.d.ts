import { Repository } from 'typeorm';
import { Chat } from './entity/chat.entity';
import { ChatMessage } from './entity/chatMessage.entity';
import { ChatMessageDto } from './dto/chatmessage-dto';
export declare class ChatService {
    private chatRepository;
    private chatMessageRepository;
    constructor(chatRepository: Repository<Chat>, chatMessageRepository: Repository<ChatMessage>);
    createMessage(chatMessageDto: ChatMessageDto): Promise<ChatMessage>;
    getMessages(chatId: number): Promise<ChatMessage[]>;
    findChat(teacherId: number, studentId: number): Promise<Chat>;
    createChat(teacherId: number, studentId: number): Promise<Chat>;
}
