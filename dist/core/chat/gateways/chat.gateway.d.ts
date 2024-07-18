import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomCreationDto } from '../dto/roomCreation-dto';
import { ChatService } from '../chat.service';
export declare class ChatgateWay implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private chatService;
    server: Server;
    constructor(chatService: ChatService);
    handleJoin(client: Socket, roomId: string, body: RoomCreationDto): Promise<void>;
    handleMessage(body: RoomCreationDto, client: Socket): Promise<void>;
    handleDisconnect(client: Socket): void;
    handleConnection(client: Socket): void;
    afterInit(server: Server): void;
}
