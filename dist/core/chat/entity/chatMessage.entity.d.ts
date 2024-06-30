import { Chat } from './chat.entity';
export declare class ChatMessage {
    id: number;
    message: string;
    messageTime: Date;
    chat: Chat;
}
