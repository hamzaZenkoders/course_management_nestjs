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
exports.StudentGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const chat_service_1 = require("../chat.service");
const chatmessage_dto_1 = require("../dto/chatmessage-dto");
let StudentGateway = class StudentGateway {
    constructor(chatService) {
        this.chatService = chatService;
    }
    async onNewMessage(body, client) {
        console.log(body);
        console.log('Client id: ' + client.id);
        await this.chatService.createMessage(body);
        this.socket.emit('replyToTeacher', body.message);
    }
    handleDisconnect(client) {
        console.log(`Client disconnected: ${client.id}`);
    }
    handleConnection(client) {
        console.log(`Client connected: ${client.id}`);
    }
};
exports.StudentGateway = StudentGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], StudentGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Socket)
], StudentGateway.prototype, "socket", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('messageToTeacher'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chatmessage_dto_1.ChatMessageDto,
        socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], StudentGateway.prototype, "onNewMessage", null);
exports.StudentGateway = StudentGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        namespace: '/student',
        cors: {
            origin: '*',
        },
    }),
    __metadata("design:paramtypes", [chat_service_1.ChatService])
], StudentGateway);
//# sourceMappingURL=student.gateway.js.map