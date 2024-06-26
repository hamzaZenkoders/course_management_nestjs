"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailableSlotModule = void 0;
const common_1 = require("@nestjs/common");
const availableSlot_service_1 = require("./availableSlot.service");
const availableSlot_controller_1 = require("./availableSlot.controller");
const teacher_module_1 = require("../teacher/teacher.module");
let AvailableSlotModule = class AvailableSlotModule {
};
exports.AvailableSlotModule = AvailableSlotModule;
exports.AvailableSlotModule = AvailableSlotModule = __decorate([
    (0, common_1.Module)({
        imports: [teacher_module_1.TeacherModule],
        controllers: [availableSlot_controller_1.AvailableSlotController],
        providers: [availableSlot_service_1.AvailableSlotService],
        exports: [availableSlot_service_1.AvailableSlotService],
    })
], AvailableSlotModule);
//# sourceMappingURL=availableSlot.module.js.map