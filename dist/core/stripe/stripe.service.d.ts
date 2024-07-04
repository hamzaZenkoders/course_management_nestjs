export declare class StripeService {
    private stripe;
    constructor();
    createCheckoutSession(courseId: string, price: number): Promise<any>;
}
