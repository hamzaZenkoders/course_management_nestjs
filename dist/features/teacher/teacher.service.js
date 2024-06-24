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
exports.TeacherService = void 0;
const common_1 = require("@nestjs/common");
const teacher_entity_1 = require("./entities/teacher.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let TeacherService = class TeacherService {
    constructor(teacherRepository) {
        this.teacherRepository = teacherRepository;
    }
    create(createTeacherDto) {
        return 'This action adds a new teacher';
    }
    async TeacherData(id) {
        const teacher = await this.teacherRepository.findOne({ where: { id } });
        if (!teacher) {
            throw new common_1.NotFoundException();
        }
        return teacher;
    }
    async updateTeacherProfile(id, updatingData) {
        const tempData = await this.teacherRepository.findOne({ where: { id } });
        if (!tempData) {
            throw new common_1.NotFoundException();
        }
        const updatedTeacher = { ...tempData, ...updatingData };
        console.log(updatedTeacher);
        const result = await this.teacherRepository.update(id, updatedTeacher);
        if (result.affected > 0) {
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Teacher profile updated successfully',
            };
        }
        else {
            throw new common_1.HttpException('Failed to update Teacher profile', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getStudentsEnrolled(courseID, teacherID) { }
    async findAll() {
        const allTeacherResult = await this.teacherRepository.find();
        return allTeacherResult;
    }
    async findOne(email) {
        const temp = await this.teacherRepository.findOne({ where: { email } });
        return temp;
    }
    remove(id) {
        return `This action removes a #${id} teacher`;
    }
};
exports.TeacherService = TeacherService;
exports.TeacherService = TeacherService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(teacher_entity_1.Teacher)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TeacherService);
//# sourceMappingURL=teacher.service.js.map