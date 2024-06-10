import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { whiteListDomain } from '../entities/whitlistedDomain.entity';
import { Repository } from 'typeorm';
export declare class EmailAuthorizationGuard implements CanActivate {
    private reflector;
    private whitelistedDomainRepository;
    constructor(reflector: Reflector, whitelistedDomainRepository: Repository<whiteListDomain>);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
