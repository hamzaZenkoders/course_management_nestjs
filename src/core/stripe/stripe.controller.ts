import {
  Controller,
  Post,
  Body,
  Headers,
  Req,
  RawBodyRequest,
  Request,
} from '@nestjs/common';

import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('/create-checkout-session') ///testing for subcription
  createCheckoutSubscription(@Body() body: any) {
    const { lookup_key } = body;
    return this.stripeService.CheckoutSessionForSubscription(lookup_key);
  }

  @Post('/create-portal-session')
  async createPortal() {
    return this.stripeService.createPortalSession();
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
