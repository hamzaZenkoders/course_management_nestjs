import { MailService } from '../mail/mail.service';
import { Repository } from 'typeorm';
import { OTP } from './entity/otp.entity';
import { OtpVerifierDto } from './dto/otp.verification';
import { Student } from 'src/features/student/entities/student.entity';
import { Teacher } from 'src/features/teacher/entities/teacher.entity';
export declare class OtpService {
    private readonly mailService;
    private studentRepo;
    private teacherRepo;
    private otpRepository;
    constructor(mailService: MailService, studentRepo: Repository<Student>, teacherRepo: Repository<Teacher>, otpRepository: Repository<OTP>);
    saveOtp(id: number, otp: number, userType: 'student' | 'teacher'): Promise<void>;
    saveOtpAdmin(linkedID: number, otp: number): Promise<void>;
    generateOTP(): Promise<any>;
    OtpVerification(otpVeriferDto: OtpVerifierDto): Promise<void>;
}
