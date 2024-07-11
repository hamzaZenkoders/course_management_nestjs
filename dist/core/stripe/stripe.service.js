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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeService = void 0;
const common_1 = require("@nestjs/common");
const stripe_1 = require("stripe");
const typeorm_1 = require("@nestjs/typeorm");
const course_entity_1 = require("../../features/course/entities/course.entity");
const typeorm_2 = require("typeorm");
const enrollment_entity_1 = require("../../features/enrollment/entities/enrollment.entity");
const mail_service_1 = require("../mail/mail.service");
let StripeService = class StripeService {
    constructor(courseRepository, enrollmentRespository, mailService) {
        this.courseRepository = courseRepository;
        this.enrollmentRespository = enrollmentRespository;
        this.mailService = mailService;
        this.stripe = new stripe_1.default('sk_test_51PYp2xFcGIr9wzDmH4w42aaYS9PfAgTTaqS1DDHZu9pgJ5KsX0lr0alvgUhyWD6quGIggIKn1N7p4MbwJGX7mdSw00ZA95XMzw', {
            apiVersion: '2024-06-20',
        });
    }
    async createCheckoutSession(courseId, studentId, studentEmail, price, courseName) {
        const courseFound = await this.courseRepository.findOne({
            where: { id: +courseId },
        });
        if (!courseFound) {
            throw new common_1.HttpException('Course not available', common_1.HttpStatus.NOT_FOUND);
        }
        console.log(courseFound);
        const stripePrice = await this.stripe.prices.create({
            currency: 'usd',
            unit_amount: price * 100,
            product_data: {
                name: `Course Name: ${courseFound.name}`,
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
    async handleWebhookEvent(rawBody, signature) {
        if (!signature) {
            throw new common_1.HttpException('Stripe signature not found', common_1.HttpStatus.FORBIDDEN);
        }
        const endpointSecret = process.env.ENDPOINT_SECRET;
        let event;
        try {
            event = this.stripe.webhooks.constructEvent(rawBody, signature, endpointSecret);
        }
        catch (err) {
            throw new Error(`Webhook Error: ${err.message}`);
        }
        switch (event.type) {
            case 'checkout.session.completed':
                console.log('checkout session succeded');
                break;
            case 'payment_intent.succeeded':
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
    async paymentSucceed(metadata) {
        const { courseId, studentId, studentEmailAddress, course_name } = metadata;
        const enrollment = new enrollment_entity_1.Enrollment();
        enrollment.course = courseId;
        enrollment.student = studentId;
        try {
            await this.enrollmentRespository.save(enrollment);
            await this.mailService.sendCourseEmail(studentEmailAddress, course_name);
            console.log('Course has been bought successfully:', enrollment);
        }
        catch (error) {
            console.error('Error buying the course:', error);
            throw new common_1.HttpException('Failed to save course ', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        console.log('Inside course purchase history payment succeed');
    }
    async paymentFailed(metadata) {
        const { studentEmailAddress } = metadata;
        await this.mailService.sendFailedTransactionEmail(studentEmailAddress);
    }
};
exports.StripeService = StripeService;
exports.StripeService = StripeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(course_entity_1.Course)),
    __param(1, (0, typeorm_1.InjectRepository)(enrollment_entity_1.Enrollment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        mail_service_1.MailService])
], StripeService);
//# sourceMappingURL=stripe.service.js.map