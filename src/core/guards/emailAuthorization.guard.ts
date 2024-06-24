import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { whiteListDomain } from '../entities/whitlistedDomain.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//import { AuthService } from '../auth/auth.service';
//import { ROLES_KEY } from 'src/decorators/roles.decorators';

@Injectable()
export class EmailAuthorizationGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    // private readonly authService: AuthService,
    @InjectRepository(whiteListDomain)
    private whitelistedDomainRepository: Repository<whiteListDomain>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // console.log(request);
    const { email } = request.body;

    // Log the body
    console.log(email);

    //split email
    const splittedEmail = email.split('@');

    console.log(splittedEmail);

    console.log('INSIDE AUTHORIZATION GUARD');

    const domainExists = await this.whitelistedDomainRepository.findOne({
      where: { domain: splittedEmail[1] },
    });

    console.log(domainExists);
    // return !!domainExists;

    if (domainExists) {
      return true;
    } else {
      const errorMessage = 'Email domain not allowed';
      const response = context.switchToHttp().getResponse();
      response.status(HttpStatus.FORBIDDEN).json({ message: errorMessage });
      return false;
    }
  }
}
