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
exports.CourseService = void 0;
const common_1 = require("@nestjs/common");
const course_entity_1 = require("./entities/course.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const enrollment_service_1 = require("../enrollment/enrollment.service");
const stripe_service_1 = require("../../core/stripe/stripe.service");
let CourseService = class CourseService {
    constructor(courseRepository, enrollmentService, stripeService) {
        this.courseRepository = courseRepository;
        this.enrollmentService = enrollmentService;
        this.stripeService = stripeService;
    }
    async create(createCourseDto) {
        const courseExists = await this.courseExists(createCourseDto.name);
        if (courseExists) {
            throw new common_1.HttpException('Course already exists', common_1.HttpStatus.FORBIDDEN);
        }
        console.log(createCourseDto);
        const newCourse = this.courseRepository.create({
            ...createCourseDto,
            createdAt: new Date(Date.now()),
        });
        const savedCourse = await this.courseRepository.save(newCourse);
        return savedCourse;
    }
    async updateCourseContent(courseID, Updatingdata) {
        const courseExists = await this.findOne(courseID);
        if (!courseExists) {
            throw new common_1.NotFoundException();
        }
        const updatedCourseContent = { ...courseExists, ...Updatingdata };
        const result = await this.courseRepository.update(courseID, updatedCourseContent);
        if (result.affected > 0) {
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Course updated successfully',
            };
        }
        else {
            throw new common_1.HttpException('Failed to update course content', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteCourse(id) {
        const foundCourse = await this.findOne(id);
        if (!foundCourse) {
            throw new common_1.HttpException('Course does not exist', common_1.HttpStatus.NOT_FOUND);
        }
        console.log(foundCourse);
        const checkCourseEnrollment = await this.enrollmentService.hasEnrollments(id);
        if (checkCourseEnrollment === true) {
            throw new common_1.HttpException('Cannot delete course, students are enrolled', common_1.HttpStatus.FORBIDDEN);
        }
        const result = await this.courseRepository.delete({ id });
        if (result.affected === 0) {
            throw new common_1.HttpException('Course not found', common_1.HttpStatus.NOT_FOUND);
        }
        else {
            throw new common_1.HttpException('Course deleted', common_1.HttpStatus.OK);
        }
    }
    async buyPaidCourse(courseId, studentId, studentEmail, price) {
        const courseFound = await this.findOne(+courseId);
        if (!courseFound) {
            throw new common_1.HttpException('Course dose not exist', common_1.HttpStatus.BAD_REQUEST);
        }
        const courseEnrollment = await this.enrollmentService.findCourseEnrollment(+courseId, studentId);
        console.log('Checkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk');
        console.log(courseEnrollment);
        if (courseEnrollment) {
            throw new common_1.HttpException('Course is already bought', common_1.HttpStatus.FORBIDDEN);
        }
        const session = await this.stripeService.createCheckoutSession(courseId, studentId, studentEmail, price, courseFound.name);
        console.log('sessionnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn', session);
        return session;
    }
    async courseExists(courseName) {
        const course = await this.courseRepository.findOne({
            where: { name: courseName },
        });
        return !!course;
    }
    async findAll() {
        const allCoursesResult = await this.courseRepository.find();
        return allCoursesResult;
    }
    async findOne(id) {
        const temp = await this.courseRepository.findOne({ where: { id } });
        console.log('inside corse service', temp);
        return temp;
    }
    update(id, updateCourseDto) {
        return `This action updates a #${id} course`;
    }
};
exports.CourseService = CourseService;
exports.CourseService = CourseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(course_entity_1.Course)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        enrollment_service_1.EnrollmentService,
        stripe_service_1.StripeService])
], CourseService);
//# sourceMappingURL=course.service.js.map