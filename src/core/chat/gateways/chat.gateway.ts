import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { RoomCreationDto } from '../dto/roomCreation-dto';

@WebSocketGateway({})
export class ChatgateWay
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server; // Inject WebSocket server instance

  @SubscribeMessage('join')
  handleJoin(client: Socket, roomId: string) {
    client.join(roomId);
    console.log(`Client ${client.id} joined room ${roomId}`);
  }

  @SubscribeMessage('chat message')
  handleMessage(
    @MessageBody() body: RoomCreationDto,
    @ConnectedSocket() client: Socket,
  ) {}

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  afterInit(server: Server) {
    console.log('WebSocket Gateway initialized');
  }
}
