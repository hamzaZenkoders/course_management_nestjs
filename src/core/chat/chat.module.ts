import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatMessage } from './entity/chatMessage.entity';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { StudentGateway } from './gateways/student.gateway';
import { TeacherGateway } from './gateways/teacher.gateway';
import { Chat } from './entity/chat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChatMessage, Chat])],
  controllers: [ChatController],
  providers: [ChatService, StudentGateway, TeacherGateway],
  exports: [ChatService],
})
export class ChatModule {}
