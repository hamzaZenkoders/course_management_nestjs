import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('/create-checkout-session')
  create() {
    //return this.stripeService.createCheckoutSession();
    return 'working';
  }

  @Get()
  check() {
    return 'this is working';
  }
}
