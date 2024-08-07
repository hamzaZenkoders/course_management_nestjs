import {
  ConsoleLogger,
  HttpException,
  HttpStatus,
  Injectable,
  Session,
} from '@nestjs/common';
import Stripe from 'stripe';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/features/course/entities/course.entity';
import { Repository } from 'typeorm';
import { PurchaseHistory } from 'src/features/purchase-history/entities/purchaseHistor.entity';
import { PurchaseStatus } from 'src/features/enums/purchaseStatus';
import { PurchaseHistoryService } from 'src/features/purchase-history/purchase-history.service';
import { EnrollmentService } from 'src/features/enrollment/enrollment.service';
import { Enrollment } from 'src/features/enrollment/entities/enrollment.entity';
import { MailService } from '../mail/mail.service';
import { session } from 'passport';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,

    @InjectRepository(Enrollment)
    private enrollmentRespository: Repository<Enrollment>,
    // private readonly enrollmentService: EnrollmentService,

    private readonly mailService: MailService,
  ) {
    this.stripe = new Stripe(
      'sk_test_51PYp2xFcGIr9wzDmH4w42aaYS9PfAgTTaqS1DDHZu9pgJ5KsX0lr0alvgUhyWD6quGIggIKn1N7p4MbwJGX7mdSw00ZA95XMzw',
      {
        apiVersion: '2024-06-20',
      },
    );
  }

  async createCheckoutSession(
    courseId: string,
    studentId: number,
    studentEmail: string,
    price: number,
    courseName: string,
  ): Promise<any> {
    //
    //finding course
    const courseFound = await this.courseRepository.findOne({
      where: { id: +courseId },
    });

    if (!courseFound) {
      throw new HttpException('Course not available', HttpStatus.NOT_FOUND);
    }
    console.log(courseFound);

    const stripePrice = await this.stripe.prices.create({
      currency: 'usd',
      unit_amount: price * 100,
      product_data: {
        name: `Course Name: ${courseFound.name}`, // Name of the product (course)
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
      metadata: {
        courseId: +courseId,
        studentId: +studentId,
        studentEmailAddress: studentEmail,
        price: +price,
        course_name: courseName,
      },
      payment_intent_data: {
        metadata: {
          courseId: +courseId,
          studentId: +studentId,
          studentEmailAddress: studentEmail,
          price: +price,
          course_name: courseName,
        },
      },
    });

    return session;
  }

  async handleWebhookEvent(rawBody: Buffer, signature: string): Promise<any> {
    if (!signature) {
      throw new HttpException(
        'Stripe signature not found',
        HttpStatus.FORBIDDEN,
      );
    }

    const endpointSecret = process.env.ENDPOINT_SECRET;

    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(
        rawBody,
        signature,
        endpointSecret,
      );
    } catch (err) {
      throw new Error(`Webhook Error: ${err.message}`);
    }

    let subscription;
    let status;
    switch (event.type) {
      case 'checkout.session.completed':
        console.log('checkout session succeded');

        break;
      case 'payment_intent.succeeded':
        //  console.log('eventtttttttt on succeedd', event);

        this.paymentSucceed(event.data.object.metadata);
        break;
      case 'payment_intent.payment_failed':
        this.paymentFailed(event.data.object.metadata);
        break;

      //////subscription/////
      case 'customer.subscription.trial_will_end':
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        // Then define and call a method to handle the subscription trial ending.
        // handleSubscriptionTrialEnding(subscription);
        break;
      case 'customer.subscription.deleted':
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        // Then define and call a method to handle the subscription deleted.
        // handleSubscriptionDeleted(subscriptionDeleted);
        break;
      case 'customer.subscription.created':
        console.log('inside customer subscription created');
        console.log(event);
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        // Then define and call a method to handle the subscription created.
        this.handleSubscriptionCreated(subscription);
        break;
      case 'customer.subscription.updated':
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        // Then define and call a method to handle the subscription update.
        // handleSubscriptionUpdated(subscription);
        break;
      case 'entitlements.active_entitlement_summary.updated':
        subscription = event.data.object;
        console.log(`Active entitlement summary updated for ${subscription}.`);
        // Then define and call a method to handle active entitlement summary updated
        // handleEntitlementUpdated(subscription);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return event;
  }

  async paymentSucceed(metadata: any) {
    const { courseId, studentId, studentEmailAddress, course_name } = metadata;

    const enrollment = new Enrollment();
    enrollment.course = courseId;
    enrollment.student = studentId;

    try {
      await this.enrollmentRespository.save(enrollment);

      await this.mailService.sendCourseEmail(studentEmailAddress, course_name);

      console.log('Course has been bought successfully:', enrollment);
    } catch (error) {
      console.error('Error buying the course:', error);
      throw new HttpException(
        'Failed to save course ',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    console.log('Inside course purchase history payment succeed');
    // console.log(coursePurchaseHistory);
  }

  async paymentFailed(metadata: any) {
    const { studentEmailAddress } = metadata;

    await this.mailService.sendFailedTransactionEmail(studentEmailAddress);
  }

  ////////////////////////////subscription//////////////////////////////////

  async CheckoutSessionForSubscription(lookup_key: string) {
    const prices = await this.stripe.prices.list({
      lookup_keys: [lookup_key],
      expand: ['data.product'],
    });
    const session = await this.stripe.checkout.sessions.create({
      billing_address_collection: 'auto',
      line_items: [
        {
          price: prices.data[0].id,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      metadata: {
        lookupkey: lookup_key,
      },

      success_url: 'https://www.google.com/',
      cancel_url: 'https://www.facebook.com/',
    });

    console.log(session);
    return { session };
  }

  /*   async createSubscriptionSession() {
    const prod = await this.stripe.products.retrieve('prod_QSdGXKI8e18Qla');

    const price = await this.stripe.prices.retrieve(
      prod.default_price.toString(),
    );

    return await this.stripe.checkout.sessions.create({
      success_url: 'http:/  /localhost:3000/api#/',
      line_items: [
        {
          price: price.id,
          quantity: 2,
        },
      ],
      mode: 'subscription',
      metadata: {
        eventType: 'BUY COURSE',
      },
    });
  } */

  async createPortalSession() {
    const session_id =
      'cs_test_a1A7GIwJBlLA4Xxpm4k9f8P1hghdQfId7U1820SLJrlSAn4EwYTdoiHxnq';

    const checkoutSession =
      await this.stripe.checkout.sessions.retrieve(session_id);

    const returnUrl = 'https://www.facebook.com/';

    const portalSession = await this.stripe.billingPortal.sessions.create({
      customer: String(checkoutSession.customer),
      return_url: returnUrl,
    });

    return portalSession;
  }

  async handleSubscriptionCreated(session: Object) {
    //console.log(session.data.object.metadata);
  }
}
