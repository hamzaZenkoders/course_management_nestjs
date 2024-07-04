"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStripeDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_stripe_dto_1 = require("./create-stripe.dto");
class UpdateStripeDto extends (0, mapped_types_1.PartialType)(create_stripe_dto_1.CreateStripeDto) {
}
exports.UpdateStripeDto = UpdateStripeDto;
//# sourceMappingURL=update-stripe.dto.js.map