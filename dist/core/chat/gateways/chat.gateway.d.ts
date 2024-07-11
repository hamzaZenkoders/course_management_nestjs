import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomCreationDto } from '../dto/roomCreation-dto';
export declare class ChatgateWay implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    handleJoin(client: Socket, roomId: string): void;
    handleMessage(body: RoomCreationDto, client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleConnection(client: Socket): void;
    afterInit(server: Server): void;
}
