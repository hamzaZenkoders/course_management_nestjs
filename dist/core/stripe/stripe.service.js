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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeService = void 0;
const common_1 = require("@nestjs/common");
const stripe_1 = require("stripe");
let StripeService = class StripeService {
    constructor() {
        this.stripe = new stripe_1.default('sk_test_51PYp2xFcGIr9wzDmH4w42aaYS9PfAgTTaqS1DDHZu9pgJ5KsX0lr0alvgUhyWD6quGIggIKn1N7p4MbwJGX7mdSw00ZA95XMzw', {
            apiVersion: '2024-06-20',
        });
    }
    async createCheckoutSession(courseId, price) {
        const stripePrice = await this.stripe.prices.create({
            currency: 'usd',
            unit_amount: price * 100,
            product_data: {
                name: `Course Purchase: ${courseId}`,
            },
        });
        const session = await this.stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: stripePrice.id,
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'https://www.google.com/',
            cancel_url: 'http://localhost:3000/cancel',
        });
        return session;
    }
};
exports.StripeService = StripeService;
exports.StripeService = StripeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], StripeService);
//# sourceMappingURL=stripe.service.js.map