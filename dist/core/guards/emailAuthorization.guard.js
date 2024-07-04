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
exports.EmailAuthorizationGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const whitlistedDomain_entity_1 = require("../entities/whitlistedDomain.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let EmailAuthorizationGuard = class EmailAuthorizationGuard {
    constructor(reflector, whitelistedDomainRepository) {
        this.reflector = reflector;
        this.whitelistedDomainRepository = whitelistedDomainRepository;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const { email } = request.body;
        console.log(email);
        const splittedEmail = email.split('@');
        console.log(splittedEmail);
        console.log('INSIDE AUTHORIZATION GUARD');
        const domainExists = await this.whitelistedDomainRepository.findOne({
            where: { domain: splittedEmail[1] },
        });
        console.log(domainExists);
        if (domainExists) {
            return true;
        }
        else {
            const errorMessage = 'Email domain not allowed';
            const response = context.switchToHttp().getResponse();
            response.status(common_1.HttpStatus.FORBIDDEN).json({ message: errorMessage });
            return false;
        }
    }
};
exports.EmailAuthorizationGuard = EmailAuthorizationGuard;
exports.EmailAuthorizationGuard = EmailAuthorizationGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(whitlistedDomain_entity_1.whiteListDomain)),
    __metadata("design:paramtypes", [core_1.Reflector,
        typeorm_2.Repository])
], EmailAuthorizationGuard);
//# sourceMappingURL=emailAuthorization.guard.js.map