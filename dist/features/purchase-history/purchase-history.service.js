"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseHistoryService = void 0;
const common_1 = require("@nestjs/common");
let PurchaseHistoryService = class PurchaseHistoryService {
    create(createPurchaseHistoryDto) {
        return 'This action adds a new purchaseHistory';
    }
    findAll() {
        return `This action returns all purchaseHistory`;
    }
    findOne(id) {
        return `This action returns a #${id} purchaseHistory`;
    }
    update(id, updatePurchaseHistoryDto) {
        return `This action updates a #${id} purchaseHistory`;
    }
    remove(id) {
        return `This action removes a #${id} purchaseHistory`;
    }
};
exports.PurchaseHistoryService = PurchaseHistoryService;
exports.PurchaseHistoryService = PurchaseHistoryService = __decorate([
    (0, common_1.Injectable)()
], PurchaseHistoryService);
//# sourceMappingURL=purchase-history.service.js.map