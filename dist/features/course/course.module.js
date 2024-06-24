"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseModule = void 0;
const common_1 = require("@nestjs/common");
const course_service_1 = require("./course.service");
const course_controller_1 = require("./course.controller");
const typeorm_1 = require("@nestjs/typeorm");
const course_entity_1 = require("./entities/course.entity");
const student_module_1 = require("../student/student.module");
const student_entity_1 = require("../student/entities/student.entity");
const enrollment_entity_1 = require("../enrollment/entities/enrollment.entity");
const enrollment_module_1 = require("../enrollment/enrollment.module");
const enrollment_service_1 = require("../enrollment/enrollment.service");
let CourseModule = class CourseModule {
};
exports.CourseModule = CourseModule;
exports.CourseModule = CourseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => enrollment_module_1.EnrollmentModule),
            (0, common_1.forwardRef)(() => student_module_1.StudentModule),
            typeorm_1.TypeOrmModule.forFeature([course_entity_1.Course, enrollment_entity_1.Enrollment, student_entity_1.Student]),
        ],
        controllers: [course_controller_1.CourseController],
        providers: [course_service_1.CourseService, enrollment_service_1.EnrollmentService],
        exports: [course_service_1.CourseService],
    })
], CourseModule);
//# sourceMappingURL=course.module.js.map