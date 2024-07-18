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
exports.ChatgateWay = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const roomCreation_dto_1 = require("../dto/roomCreation-dto");
const chat_service_1 = require("../chat.service");
let ChatgateWay = class ChatgateWay {
    constructor(chatService) {
        this.chatService = chatService;
    }
    async handleJoin(client, roomId, body) {
        let chatRoomId = await this.chatService.createPrivateChat(body);
        client.join(chatRoomId);
        console.log(`Client ${client.id} has joined chat ${chatRoomId}`);
    }
    async handleMessage(body, client) { }
    handleDisconnect(client) {
        console.log(`Client disconnected: ${client.id}`);
    }
    handleConnection(client) {
        console.log(`Client connected: ${client.id}`);
    }
    afterInit(server) {
        console.log('WebSocket Gateway initialized');
    }
};
exports.ChatgateWay = ChatgateWay;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatgateWay.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinRoom'),
    __param(2, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String, roomCreation_dto_1.RoomCreationDto]),
    __metadata("design:returntype", Promise)
], ChatgateWay.prototype, "handleJoin", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('chat message'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [roomCreation_dto_1.RoomCreationDto,
        socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatgateWay.prototype, "handleMessage", null);
exports.ChatgateWay = ChatgateWay = __decorate([
    (0, websockets_1.WebSocketGateway)({}),
    __metadata("design:paramtypes", [chat_service_1.ChatService])
], ChatgateWay);
//# sourceMappingURL=chat.gateway.js.map