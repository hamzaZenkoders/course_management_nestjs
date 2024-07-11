"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const chat_entity_1 = require("./entity/chat.entity");
const chatMessage_entity_1 = require("./entity/chatMessage.entity");
let ChatService = class ChatService {
    constructor(chatRepository, chatMessageRepository) {
        this.chatRepository = chatRepository;
        this.chatMessageRepository = chatMessageRepository;
    }
    async createMessage(chatMessageDto) {
        const { message, teacherId, studentId } = chatMessageDto;
        let chat = await this.findChat(teacherId, studentId);
        if (!chat) {
            chat = await this.createChat(teacherId, studentId);
        }
        const chatMessage = new chatMessage_entity_1.ChatMessage();
        chatMessage.message = message;
        chatMessage.chat = chat;
        return await this.chatMessageRepository.save(chatMessage);
    }
    async getMessages(chatId) {
        return await this.chatMessageRepository.find({
            where: { chat: { id: chatId } },
        });
    }
    async findChat(teacherId, studentId) {
        return await this.chatRepository.findOne({
            where: { teacher: { id: teacherId }, student: { id: studentId } },
        });
    }
    async createChat(teacherId, studentId) {
        const chat = new chat_entity_1.Chat();
        chat.teacher = { id: teacherId };
        chat.student = { id: studentId };
        return await this.chatRepository.save(chat);
    }
    async createPrivateChat(roomCreationDto) {
        const { teacherId, studentId } = roomCreationDto;
        let chat = await this.findChat(teacherId, studentId);
        if (!chat) {
            chat = await this.createChat(teacherId, studentId);
        }
        return chat.id;
    }
    async saveMessage(messageDto) {
        const { message, chatID } = messageDto;
        const chat = await this.chatRepository.findOne({ where: { id: chatID } });
        if (!chat) {
            throw new Error(`Chat with ID ${chatID} not found`);
        }
        const chatMessage = new chatMessage_entity_1.ChatMessage();
        chatMessage.message = message;
        chatMessage.chat = chat;
        return await this.chatMessageRepository.save(chatMessage);
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(chat_entity_1.Chat)),
    __param(1, (0, typeorm_1.InjectRepository)(chatMessage_entity_1.ChatMessage)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ChatService);
//# sourceMappingURL=chat.service.js.map