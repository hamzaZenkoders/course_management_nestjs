import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(
      'sk_test_51PYp2xFcGIr9wzDmH4w42aaYS9PfAgTTaqS1DDHZu9pgJ5KsX0lr0alvgUhyWD6quGIggIKn1N7p4MbwJGX7mdSw00ZA95XMzw',
      {
        apiVersion: '2024-06-20',
      },
    );
  }

  async createCheckoutSession(courseId: string, price: number): Promise<any> {
    // Create a price in Stripe for the course
    const stripePrice = await this.stripe.prices.create({
      currency: 'usd',
      unit_amount: price * 100,
      product_data: {
        name: `Course Purchase: ${courseId}`, // Name of the product (course)
      },
    });

    // Create a checkout session in Stripe
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: stripePrice.id,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://www.google.com/', // Success URL after payment completion
      cancel_url: 'http://localhost:3000/cancel', // Cancel URL if payment is canceled
    });

    return session;
  }
}
