import { MailService } from '../mail/mail.service';
import { Repository } from 'typeorm';
import { OTP } from './entity/otp.entity';
import { OtpVerifierDto } from './dto/otp.verification';
import { Student } from 'src/features/student/entities/student.entity';
export declare class OtpService {
    private readonly mailService;
    private studentRepo;
    private otpRepository;
    constructor(mailService: MailService, studentRepo: Repository<Student>, otpRepository: Repository<OTP>);
    OtpVerification(otpVeriferDto: OtpVerifierDto): Promise<void>;
    saveOtp(linkedID: number, otp: number): Promise<void>;
    generateOTP(): Promise<any>;
}
