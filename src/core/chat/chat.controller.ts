import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatMessageDto } from './dto/chatmessage-dto';
import { ChatMessage } from './entity/chatMessage.entity';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('/:chatId/messages')
  async getAllMessages(
    @Param('chatId') chatId: number,
  ): Promise<ChatMessage[]> {
    return await this.chatService.getMessages(chatId);
  }

  @Post('/message') //creating chat message
  async createMessage(@Body() chatMessageDto: ChatMessageDto) {
    return await this.chatService.createMessage(chatMessageDto);
  }
}
