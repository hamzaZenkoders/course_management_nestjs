import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorator/roles.decorator';

@Injectable()
export class RoleAuthorizationGuard implements CanActivate {
  constructor(private reflector: Reflector) {} // Used to access metadata in controller or provider

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    const userRole = request.user.role;

    console.log('INSIDE AUTHORIZATION GUARD');
    console.log('requiredRoles ', requiredRoles);
    console.log('userRole ', userRole);

    return requiredRoles.some((role) => role === userRole);
  }
}
