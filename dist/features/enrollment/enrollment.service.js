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
exports.EnrollmentService = void 0;
const common_1 = require("@nestjs/common");
const course_service_1 = require("../course/course.service");
const student_service_1 = require("../student/student.service");
const enrollment_entity_1 = require("./entities/enrollment.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let EnrollmentService = class EnrollmentService {
    constructor(enrollmentRepository, courseService, studentService) {
        this.enrollmentRepository = enrollmentRepository;
        this.courseService = courseService;
        this.studentService = studentService;
    }
    create(createEnrollmentDto) {
        return 'This action adds a new enrollment';
    }
    findAll() {
        return `This action returns all enrollment`;
    }
    findOne(id) {
        return `This action returns a #${id} enrollment`;
    }
    update(id, updateEnrollmentDto) {
        return `This action updates a #${id} enrollment`;
    }
    remove(id) {
        return `This action removes a #${id} enrollment`;
    }
    async creatEnrollment(createEnrollmentDto) {
        const foundCourse = await this.courseService.findOne(createEnrollmentDto.courseId);
        if (!foundCourse) {
            throw new common_1.HttpException('Course not found', common_1.HttpStatus.NOT_FOUND);
        }
        const newEnrollment = this.enrollmentRepository.create({
            ...createEnrollmentDto,
        });
        const enrollmentSaved = this.enrollmentRepository.save(newEnrollment);
        return enrollmentSaved;
    }
};
exports.EnrollmentService = EnrollmentService;
exports.EnrollmentService = EnrollmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(enrollment_entity_1.Enrollment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        course_service_1.CourseService,
        student_service_1.StudentService])
], EnrollmentService);
//# sourceMappingURL=enrollment.service.js.map