/// <reference types="node" />
import { Course } from 'src/features/course/entities/course.entity';
import { Repository } from 'typeorm';
import { Enrollment } from 'src/features/enrollment/entities/enrollment.entity';
import { MailService } from '../mail/mail.service';
export declare class StripeService {
    private courseRepository;
    private enrollmentRespository;
    private readonly mailService;
    private stripe;
    constructor(courseRepository: Repository<Course>, enrollmentRespository: Repository<Enrollment>, mailService: MailService);
    createCheckoutSession(courseId: string, studentId: number, studentEmail: string, price: number, courseName: string): Promise<any>;
    handleWebhookEvent(rawBody: Buffer, signature: string): Promise<any>;
    paymentSucceed(metadata: any): Promise<void>;
    paymentFailed(metadata: any): Promise<void>;
}
