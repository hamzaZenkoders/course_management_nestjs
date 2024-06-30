// student.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from '../chat.service';
import { ChatMessageDto } from '../dto/chatmessage-dto';

@WebSocketGateway({
  namespace: '/student',
  cors: {
    origin: '*',
  },
})
export class StudentGateway {
  @WebSocketServer()
  server: Server;

  constructor(private chatService: ChatService) {}

  @WebSocketServer()
  socket: Socket; //to send to client from server

  @SubscribeMessage('messageToTeacher') //socket.on
  async onNewMessage(
    @MessageBody() body: ChatMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(body);
    console.log('Client id: ' + client.id);

    //saving in database
    await this.chatService.createMessage(body);

    this.socket.emit('replyToTeacher', body.message);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }
}
