import { RawBodyRequest } from '@nestjs/common';
import { Request } from 'express';
import { StripeService } from './stripe.service';
export declare class StripeController {
    private readonly stripeService;
    constructor(stripeService: StripeService);
    create(): string;
    webhook(req: RawBodyRequest<Request>, signature: string): Promise<{
        received: boolean;
        event: any;
        error?: undefined;
    } | {
        received: boolean;
        error: any;
        event?: undefined;
    }>;
}
