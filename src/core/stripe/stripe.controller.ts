import {
  Controller,
  Post,
  Body,
  Headers,
  Req,
  RawBodyRequest,
} from '@nestjs/common';
import { Request } from 'express'; // Import Request from express

import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('/create-checkout-session')
  create() {
    // return this.stripeService.createCheckoutSession();
    return 'working';
  }

  @Post('/webhook')
  async webhook(
    @Req() req: RawBodyRequest<Request>,
    @Headers('stripe-signature') signature: string,
  ) {
    try {
      const event = await this.stripeService.handleWebhookEvent(
        req.rawBody,
        signature,
      );
      return { received: true, event };
    } catch (error) {
      console.error('Error handling webhook:', error.message);
      return { received: false, error: error.message };
    }
  }
}
