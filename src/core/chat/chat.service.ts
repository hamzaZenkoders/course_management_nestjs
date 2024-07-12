// chat.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './entity/chat.entity';
import { ChatMessage } from './entity/chatMessage.entity';
import { ChatMessageDto } from './dto/chatmessage-dto';
import { Teacher } from 'src/features/teacher/entities/teacher.entity';
import { Student } from 'src/features/student/entities/student.entity';
import { RoomCreationDto } from './dto/roomCreation-dto';
import { MessageDto } from './dto/message-dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
    @InjectRepository(ChatMessage)
    private chatMessageRepository: Repository<ChatMessage>,
  ) {}

  async createMessage(chatMessageDto: ChatMessageDto): Promise<ChatMessage> {
    //    console.log('In the chat service to see test', chatMessageDto);

    const { message, teacherId, studentId } = chatMessageDto;

    let chat = await this.findChat(teacherId, studentId);
    if (!chat) {
      chat = await this.createChat(teacherId, studentId);
    }

    const chatMessage = new ChatMessage();
    chatMessage.message = message;
    chatMessage.chat = chat;

    return await this.chatMessageRepository.save(chatMessage);
  }

  async getMessages(chatId: number): Promise<ChatMessage[]> {
    return await this.chatMessageRepository.find({
      where: { chat: { id: chatId } },
    });
  }

  ////////////////////////////to see if already chat exists among teacher and student//////////////////
  async findChat(teacherId: number, studentId: number): Promise<Chat> {
    return await this.chatRepository.findOne({
      where: { teacher: { id: teacherId }, student: { id: studentId } },
    });
  }

  ////////////////////////////creating chat between teacher and student///////////////////
  async createChat(teacherId: number, studentId: number): Promise<Chat> {
    const chat = new Chat();
    chat.teacher = { id: teacherId } as Teacher;
    chat.student = { id: studentId } as Student;
    return await this.chatRepository.save(chat);
  }

  ///////////////////////////creating private chat ////////////////////////////
  async createPrivateChat(roomCreationDto: RoomCreationDto): Promise<any> {
    //    console.log('In the chat service to see test', chatMessageDto);

    const { teacherId, studentId } = roomCreationDto;

    let chat = await this.findChat(teacherId, studentId);
    if (!chat) {
      chat = await this.createChat(teacherId, studentId);
    }

    return chat.id;
  }

  async saveMessage(messageDto: MessageDto) {
    const { message, chatID } = messageDto;

    const chat = await this.chatRepository.findOne({ where: { id: chatID } });

    if (!chat) {
      throw new Error(`Chat with ID ${chatID} not found`);
    }

    const chatMessage = new ChatMessage();
    chatMessage.message = message;
    chatMessage.chat = chat;

    return await this.chatMessageRepository.save(chatMessage);
  }
}
