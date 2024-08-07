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
const student_entity_1 = require("../student/entities/student.entity");
let EnrollmentService = class EnrollmentService {
    constructor(enrollmentRepository, studentRepository, courseService, studentService) {
        this.enrollmentRepository = enrollmentRepository;
        this.studentRepository = studentRepository;
        this.courseService = courseService;
        this.studentService = studentService;
    }
    create(createEnrollmentDto) {
        return 'This action adds a new enrollment';
    }
    findAll() {
        return `This action returns all enrollment`;
    }
    remove(id) {
        return `This action removes a #${id} enrollment`;
    }
    async creatEnrollment(createEnrollmentDto) {
        console.log(createEnrollmentDto);
        console.log(createEnrollmentDto.course_id);
        const foundCourse = await this.courseService.findOne(createEnrollmentDto.course_id);
        if (!foundCourse) {
            throw new common_1.HttpException('Course not found', common_1.HttpStatus.NOT_FOUND);
        }
        const studentFound = await this.studentService.findByID(createEnrollmentDto.student_id);
        if (!studentFound) {
            throw new common_1.HttpException('Student not found', common_1.HttpStatus.NOT_FOUND);
        }
        const newEnrollment = this.enrollmentRepository.create({
            ...createEnrollmentDto,
            student: { id: createEnrollmentDto.student_id },
            course: foundCourse,
        });
        const enrollmentSaved = this.enrollmentRepository.save(newEnrollment);
        return enrollmentSaved;
    }
    async removeEnrollment(enrollmentID) {
        console.log(enrollmentID);
        const foundEnrollment = await this.findOne(enrollmentID);
        console.log(foundEnrollment.course.dropDeadline);
        console.log(new Date(Date.now()));
        const dropDeadlineUTC = new Date(foundEnrollment.course.dropDeadline);
        const currentDateTimeUTC = new Date();
        if (currentDateTimeUTC > dropDeadlineUTC) {
            throw new common_1.HttpException('Course dropped deadline has already passed', common_1.HttpStatus.FORBIDDEN);
        }
        const result = await this.enrollmentRepository.delete({ id: enrollmentID });
        if (result.affected === 0) {
            throw new common_1.HttpException('Enrollment not found', common_1.HttpStatus.NOT_FOUND);
        }
        return result;
    }
    async hasEnrollments(courseId) {
        const enrollment = await this.enrollmentRepository.findOne({
            where: { course: { id: courseId } },
        });
        return !!enrollment;
    }
    async findOne(id) {
        const result = await this.enrollmentRepository.findOne({
            where: { id },
            relations: ['student', 'course'],
        });
        return result;
    }
    async findCourseEnrollment(courseId, studentId) {
        return await this.enrollmentRepository.findOne({
            where: { course: { id: courseId }, student: { id: studentId } },
        });
    }
};
exports.EnrollmentService = EnrollmentService;
exports.EnrollmentService = EnrollmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(enrollment_entity_1.Enrollment)),
    __param(1, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => course_service_1.CourseService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        course_service_1.CourseService,
        student_service_1.StudentService])
], EnrollmentService);
//# sourceMappingURL=enrollment.service.js.map