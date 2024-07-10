import {
  ConsoleLogger,
  HttpException,
  HttpStatus,
  Injectable,
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

    const endpointSecret =
      'whsec_50dc09115f5e66833cb1306a381203c6f67da2ffecc4ce4635fb7c6b3d667ea5';

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
}
