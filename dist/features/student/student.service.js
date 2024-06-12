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
exports.StudentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const otp_entity_1 = require("../../core/otp/entity/otp.entity");
const student_entity_1 = require("./entities/student.entity");
const mail_service_1 = require("../../core/mail/mail.service");
const otp_service_1 = require("../../core/otp/otp.service");
const jwt_1 = require("@nestjs/jwt");
const course_service_1 = require("../course/course.service");
let StudentService = class StudentService {
    constructor(studentRepository, otpRepository, mailService, otpService, jwtService, courseService) {
        this.studentRepository = studentRepository;
        this.otpRepository = otpRepository;
        this.mailService = mailService;
        this.otpService = otpService;
        this.jwtService = jwtService;
        this.courseService = courseService;
    }
    async register(createStudentDto) {
        const existingUser = await this.studentRepository.findOne({
            where: { email: createStudentDto.email },
        });
        console.log('check env', process.env.Sender_Email);
        if (existingUser) {
            throw new common_1.HttpException('Student already exists', common_1.HttpStatus.FORBIDDEN);
        }
        console.log(createStudentDto);
        const hashedPassword = await bcrypt.hash(createStudentDto.password, 10);
        const newStudent = this.studentRepository.create({
            ...createStudentDto,
            createdAt: new Date(Date.now()),
            password: hashedPassword,
        });
        const tempSave = { id: newStudent.id, ...newStudent };
        const savedStudent = await this.studentRepository.save(tempSave);
        const otpRecieved = await this.otpService.generateOTP();
        if (savedStudent.isVerified === false) {
            await this.otpService.saveOtp(savedStudent.id, otpRecieved);
            await this.mailService.sendEmailOtp(tempSave.email, otpRecieved);
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Verification otp is sent to email',
            };
        }
        else {
            console.log('Student is verified:', savedStudent);
            return savedStudent;
        }
    }
    async login(loginInStudentDto) {
        const StudentFound = await this.studentRepository.findOne({
            where: { email: loginInStudentDto.email },
        });
        if (!StudentFound) {
            throw new common_1.NotFoundException('User not found');
        }
        const passwordMatched = await bcrypt.compare(loginInStudentDto.password, StudentFound.password);
        if (!passwordMatched) {
            throw new common_1.UnauthorizedException();
        }
        const payload = { email: StudentFound.email, role: StudentFound.role };
        const token = this.jwtService.sign(payload);
        return { token };
    }
    async EnrollInCourse(createEnrollmentDto) { }
    async findOne(email) {
        const temp = await this.studentRepository.findOne({ where: { email } });
        return temp;
    }
    async findByID(id) {
        const temp = await this.studentRepository.findOne({ where: { id } });
        return temp;
    }
    async updateIsVerifiedStatus(studentId, isVerified) {
        await this.studentRepository.update(studentId, { isVerified });
    }
};
exports.StudentService = StudentService;
exports.StudentService = StudentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __param(1, (0, typeorm_1.InjectRepository)(otp_entity_1.OTP)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        mail_service_1.MailService,
        otp_service_1.OtpService,
        jwt_1.JwtService,
        course_service_1.CourseService])
], StudentService);
//# sourceMappingURL=student.service.js.map