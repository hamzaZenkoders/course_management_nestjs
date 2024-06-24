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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const teacher_service_1 = require("../teacher/teacher.service");
const typeorm_1 = require("@nestjs/typeorm");
const teacher_entity_1 = require("../teacher/entities/teacher.entity");
const typeorm_2 = require("typeorm");
const student_service_1 = require("../student/student.service");
const student_entity_1 = require("../student/entities/student.entity");
let AdminService = class AdminService {
    constructor(teacherService, studentService, teacherRepository, studentRepository) {
        this.teacherService = teacherService;
        this.studentService = studentService;
        this.teacherRepository = teacherRepository;
        this.studentRepository = studentRepository;
    }
    async suspendTeacher(teacher_id) {
        const foundTeacher = await this.teacherService.findByID(teacher_id);
        console.log(foundTeacher);
        if (!foundTeacher) {
            throw new common_1.HttpException('Failed to update Teacher profile', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        const updatedTeacherData = { ...foundTeacher, is_Suspended: true };
        const result = await this.teacherRepository.update(teacher_id, updatedTeacherData);
        if (result.affected > 0) {
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Teacher has been suspended',
            };
        }
        else {
            throw new common_1.HttpException('Failed to suspend teacher', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async suspendStudent(student_id) {
        const foundStudent = await this.studentService.findByID(student_id);
        console.log(foundStudent);
        if (!foundStudent) {
            throw new common_1.HttpException('Failed to update student profile', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        const updatedStudentData = { ...foundStudent, is_Suspended: true };
        const result = await this.studentRepository.update(student_id, updatedStudentData);
        if (result.affected > 0) {
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Student has been suspended',
            };
        }
        else {
            throw new common_1.HttpException('Failed to suspend student', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(teacher_entity_1.Teacher)),
    __param(3, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __metadata("design:paramtypes", [teacher_service_1.TeacherService,
        student_service_1.StudentService,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AdminService);
//# sourceMappingURL=admin.service.js.map