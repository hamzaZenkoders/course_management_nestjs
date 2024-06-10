export declare class MailService {
    private readonly transporter;
    constructor(transporter: any);
    sendEmailOtp(email: string): Promise<any>;
}
