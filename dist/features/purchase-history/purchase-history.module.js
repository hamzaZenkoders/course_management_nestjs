"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseHistoryModule = void 0;
const common_1 = require("@nestjs/common");
const purchase_history_service_1 = require("./purchase-history.service");
const purchase_history_controller_1 = require("./purchase-history.controller");
const typeorm_1 = require("@nestjs/typeorm");
const purchaseHistor_entity_1 = require("./entities/purchaseHistor.entity");
let PurchaseHistoryModule = class PurchaseHistoryModule {
};
exports.PurchaseHistoryModule = PurchaseHistoryModule;
exports.PurchaseHistoryModule = PurchaseHistoryModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([purchaseHistor_entity_1.PurchaseHistory])],
        controllers: [purchase_history_controller_1.PurchaseHistoryController],
        providers: [purchase_history_service_1.PurchaseHistoryService],
        exports: [purchase_history_service_1.PurchaseHistoryService],
    })
], PurchaseHistoryModule);
//# sourceMappingURL=purchase-history.module.js.map