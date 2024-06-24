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
const student_entity_1 = require("./entities/student.entity");
let StudentService = class StudentService {
    constructor(studentRepository) {
        this.studentRepository = studentRepository;
    }
    async studentAllEnrolledCourses(student_id) {
        const studentWithCourses = await this.studentRepository
            .createQueryBuilder('student')
            .leftJoinAndSelect('student.enrollments', 'enrollment')
            .leftJoinAndSelect('enrollment.course', 'course')
            .where('student.id = :id', { id: student_id })
            .getMany();
        return studentWithCourses;
    }
    async updateStudentProfile(id, updatingData) {
        const tempData = await this.studentData(id);
        if (!tempData) {
            throw new common_1.NotFoundException();
        }
        const updatedStudent = { ...tempData, ...updatingData };
        console.log(updatedStudent);
        const result = await this.studentRepository.update(id, updatedStudent);
        if (result.affected > 0) {
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Student profile updated successfully',
            };
        }
        else {
            throw new common_1.HttpException('Failed to update student profile', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async studentData(id) {
        const student = await this.studentRepository.findOne({ where: { id } });
        if (!student) {
            throw new common_1.NotFoundException();
        }
        return student;
    }
    async findAll() {
        const allStudentResult = await this.studentRepository.find();
        return allStudentResult;
    }
    async findOne(email) {
        const temp = await this.studentRepository.findOne({ where: { email } });
        return temp;
    }
    async findByID(id) {
        const temp = await this.studentRepository.findOne({ where: { id } });
        return temp;
    }
    async updateIsVerifiedStatus(studentId, is_Verified) {
        await this.studentRepository.update(studentId, { is_Verified });
    }
};
exports.StudentService = StudentService;
exports.StudentService = StudentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], StudentService);
//# sourceMappingURL=student.service.js.map