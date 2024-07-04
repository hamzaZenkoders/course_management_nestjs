"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePurchaseHistoryDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_purchase_history_dto_1 = require("./create-purchase-history.dto");
class UpdatePurchaseHistoryDto extends (0, mapped_types_1.PartialType)(create_purchase_history_dto_1.CreatePurchaseHistoryDto) {
}
exports.UpdatePurchaseHistoryDto = UpdatePurchaseHistoryDto;
//# sourceMappingURL=update-purchase-history.dto.js.map