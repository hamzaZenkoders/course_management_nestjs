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
import { ChatService } from '../chat.service';

@WebSocketGateway({})
export class ChatgateWay
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server; // Inject WebSocket server instance

  constructor(private chatService: ChatService) {}

  @SubscribeMessage('joinRoom')
  async handleJoin(
    client: Socket,
    roomId: string,
    @MessageBody() body: RoomCreationDto,
  ) {
    let chatRoomId = await this.chatService.createPrivateChat(body);

    client.join(chatRoomId);
    console.log(`Client ${client.id} has joined chat ${chatRoomId}`);
  }

  @SubscribeMessage('chat message')
  async handleMessage(
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
