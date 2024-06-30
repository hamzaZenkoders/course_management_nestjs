"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const chatMessage_entity_1 = require("./entity/chatMessage.entity");
const chat_controller_1 = require("./chat.controller");
const chat_service_1 = require("./chat.service");
const student_gateway_1 = require("./gateways/student.gateway");
const teacher_gateway_1 = require("./gateways/teacher.gateway");
const chat_entity_1 = require("./entity/chat.entity");
let ChatModule = class ChatModule {
};
exports.ChatModule = ChatModule;
exports.ChatModule = ChatModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([chatMessage_entity_1.ChatMessage, chat_entity_1.Chat])],
        controllers: [chat_controller_1.ChatController],
        providers: [chat_service_1.ChatService, student_gateway_1.StudentGateway, teacher_gateway_1.TeacherGateway],
        exports: [chat_service_1.ChatService],
    })
], ChatModule);
//# sourceMappingURL=chat.module.js.map