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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseHistory = void 0;
const typeorm_1 = require("typeorm");
const course_entity_1 = require("../../course/entities/course.entity");
const student_entity_1 = require("../../student/entities/student.entity");
const purchaseStatus_1 = require("../../enums/purchaseStatus");
let PurchaseHistory = class PurchaseHistory {
};
exports.PurchaseHistory = PurchaseHistory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PurchaseHistory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => student_entity_1.Student, (student) => student.purchases),
    __metadata("design:type", student_entity_1.Student)
], PurchaseHistory.prototype, "student", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => course_entity_1.Course, (course) => course.purchases),
    __metadata("design:type", course_entity_1.Course)
], PurchaseHistory.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: purchaseStatus_1.PurchaseStatus,
    }),
    __metadata("design:type", String)
], PurchaseHistory.prototype, "purchase_status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint' }),
    __metadata("design:type", Number)
], PurchaseHistory.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], PurchaseHistory.prototype, "purchaseDate", void 0);
exports.PurchaseHistory = PurchaseHistory = __decorate([
    (0, typeorm_1.Entity)()
], PurchaseHistory);
//# sourceMappingURL=purchaseHistor.entity.js.map