import { ChatService } from './chat.service';
import { ChatMessageDto } from './dto/chatmessage-dto';
import { ChatMessage } from './entity/chatMessage.entity';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    getAllMessages(chatId: number): Promise<ChatMessage[]>;
    createMessage(chatMessageDto: ChatMessageDto): Promise<ChatMessage>;
}
