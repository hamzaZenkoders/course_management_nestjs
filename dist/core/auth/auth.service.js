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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const student_service_1 = require("../../features/student/student.service");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const student_entity_1 = require("../../features/student/entities/student.entity");
const otp_entity_1 = require("../otp/entity/otp.entity");
const mail_service_1 = require("../mail/mail.service");
const otp_service_1 = require("../otp/otp.service");
const jwt_1 = require("@nestjs/jwt");
const course_service_1 = require("../../features/course/course.service");
const bcrypt = require("bcrypt");
const create_teacher_dto_1 = require("../../features/teacher/dto/create-teacher.dto");
const teacher_entity_1 = require("../../features/teacher/entities/teacher.entity");
const teacher_service_1 = require("../../features/teacher/teacher.service");
const admin_entity_1 = require("../../features/admin/entities/admin.entity");
let AuthService = class AuthService {
    constructor(studentService, adminRepository, studentRepository, otpRepository, teacherRepository, mailService, otpService, teacherService, jwtService, courseService) {
        this.studentService = studentService;
        this.adminRepository = adminRepository;
        this.studentRepository = studentRepository;
        this.otpRepository = otpRepository;
        this.teacherRepository = teacherRepository;
        this.mailService = mailService;
        this.otpService = otpService;
        this.teacherService = teacherService;
        this.jwtService = jwtService;
        this.courseService = courseService;
    }
    async validateUser(email, password) {
        const user = await this.studentService.findOne(email);
        console.log('checkinggggg', user);
        if (user && password === user.password) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    async register(createStudentDto) {
        const existingUser = await this.studentRepository.findOne({
            where: { email: createStudentDto.email },
        });
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
        const savedStudent = await this.studentRepository.save(newStudent);
        const otpRecieved = await this.otpService.generateOTP();
        if (savedStudent.is_Verified === false) {
            await this.otpService.saveOtp(savedStudent.id, otpRecieved, 'student');
            await this.mailService.sendEmailOtp(savedStudent.email, otpRecieved);
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
    async registerTeacher(createTeacherDto) {
        const existingUser = await this.teacherRepository.findOne({
            where: { email: createTeacherDto.email },
        });
        console.log('check env', process.env.Sender_Email);
        if (existingUser) {
            throw new common_1.HttpException('Teacher already exists', common_1.HttpStatus.FORBIDDEN);
        }
        console.log(create_teacher_dto_1.CreateTeacherDto);
        const hashedPassword = await bcrypt.hash(createTeacherDto.password, 10);
        const newTeacher = this.teacherRepository.create({
            ...createTeacherDto,
            createdAt: new Date(Date.now()),
            password: hashedPassword,
        });
        const tempSave = { id: newTeacher.id, ...newTeacher };
        const savedTeacher = await this.teacherRepository.save(tempSave);
        const otpRecieved = await this.otpService.generateOTP();
        console.log(otpRecieved);
        if (savedTeacher.is_Verified === false) {
            await this.otpService.saveOtp(savedTeacher.id, otpRecieved, 'teacher');
            await this.mailService.sendEmailOtp(tempSave.email, otpRecieved);
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Verification otp is sent to email',
            };
        }
        else {
            console.log('Teacher is verified:', savedTeacher);
            return savedTeacher;
        }
    }
    async signInTeacher(loginTeacherDto) {
        const TeacherFound = await this.teacherRepository.findOne({
            where: { email: loginTeacherDto.email },
        });
        if (!TeacherFound) {
            throw new common_1.NotFoundException('Teacher not found');
        }
        const passwordMatched = await bcrypt.compare(loginTeacherDto.password, TeacherFound.password);
        if (!passwordMatched) {
            throw new common_1.UnauthorizedException();
        }
        const payload = { email: TeacherFound.email, role: TeacherFound.role };
        const token = this.jwtService.sign(payload);
        return { token };
    }
    async registerAdmin(createAdminDto) {
        const existingUser = await this.adminRepository.findOne({
            where: { email: createAdminDto.email },
        });
        console.log('check env', process.env.Sender_Email);
        if (existingUser) {
            throw new common_1.HttpException('Admin already exists', common_1.HttpStatus.FORBIDDEN);
        }
        const hashedPassword = await bcrypt.hash(createAdminDto.password, 10);
        const newAdmin = this.adminRepository.create({
            ...createAdminDto,
            password: hashedPassword,
        });
        const savedAdmin = await this.adminRepository.save(newAdmin);
        const otpRecieved = await this.otpService.generateOTP();
        if (savedAdmin.is_Verified === false) {
            await this.otpService.saveOtp(savedAdmin.id, otpRecieved, 'student');
            await this.mailService.sendEmailOtp(newAdmin.email, otpRecieved);
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Verification otp is sent to email',
            };
        }
        else {
            console.log('Admin is verified:', savedAdmin);
            return savedAdmin;
        }
    }
    async signInAdmin(loginAdminDto) {
        const AdminFound = await this.adminRepository.findOne({
            where: { email: loginAdminDto.email },
        });
        if (!AdminFound) {
            throw new common_1.NotFoundException('Admin not found');
        }
        const passwordMatched = await bcrypt.compare(loginAdminDto.password, AdminFound.password);
        if (!passwordMatched) {
            throw new common_1.UnauthorizedException();
        }
        const payload = { email: AdminFound.email, role: AdminFound.role };
        const token = this.jwtService.sign(payload);
        return { token };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(admin_entity_1.Admin)),
    __param(2, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __param(3, (0, typeorm_1.InjectRepository)(otp_entity_1.OTP)),
    __param(4, (0, typeorm_1.InjectRepository)(teacher_entity_1.Teacher)),
    __metadata("design:paramtypes", [student_service_1.StudentService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        mail_service_1.MailService,
        otp_service_1.OtpService,
        teacher_service_1.TeacherService,
        jwt_1.JwtService,
        course_service_1.CourseService])
], AuthService);
//# sourceMappingURL=auth.service.js.map