export declare class MailService {
    private readonly transporter;
    constructor(transporter: any);
    sendEmailOtp(email: string, otp: number): Promise<any>;
    sendCourseEmail(email: string, courseName: string): Promise<any>;
    sendFailedTransactionEmail(email: string): Promise<any>;
}
