import { Server, Socket } from 'socket.io';
import { ChatService } from '../chat.service';
import { ChatMessageDto } from '../dto/chatmessage-dto';
export declare class TeacherGateway {
    private chatService;
    server: Server;
    constructor(chatService: ChatService);
    socket: Socket;
    onNewMessage(body: ChatMessageDto, client: Socket): Promise<void>;
    handleDisconnect(client: Socket): void;
    handleConnection(client: Socket): void;
}
