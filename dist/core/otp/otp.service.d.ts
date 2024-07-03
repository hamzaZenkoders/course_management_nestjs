import { MailService } from '../mail/mail.service';
import { Repository } from 'typeorm';
import { OTP } from './entity/otp.entity';
import { OtpVerifierDto } from './dto/otp.verification';
import { Student } from 'src/features/student/entities/student.entity';
import { Teacher } from 'src/features/teacher/entities/teacher.entity';
import { Admin } from 'src/features/admin/entities/admin.entity';
export declare class OtpService {
    private readonly mailService;
    private studentRepo;
    private teacherRepo;
    private adminRepo;
    private otpRepository;
    constructor(mailService: MailService, studentRepo: Repository<Student>, teacherRepo: Repository<Teacher>, adminRepo: Repository<Admin>, otpRepository: Repository<OTP>);
    saveOtp(id: number, otp: number, userType: 'student' | 'teacher' | 'admin'): Promise<void>;
    generateOTP(): Promise<any>;
    OtpVerification(otpVeriferDto: OtpVerifierDto): Promise<{
        message: string;
    }>;
}
