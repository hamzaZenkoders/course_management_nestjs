/* import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorator/roles.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from 'src/features/student/entities/student.entity';

@Injectable()
export class RoleAuthorizationGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    //  @InjectRepository(Student)
    //private readonly studentRepository: Repository<Student>, 
  ) {} //used to access meta data in controller or provider

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    // console.log(request);
    //const { studentId } = request.body;

    // const temp = await this.studentRepository.findOne(studentId);

    const requiredRole = this.reflector.getAllAndOverride(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    console.log('INSIDE AUTHORIZATION GUARD');

    console.log('requiredRole ', requiredRole);
    //return validateRequest(request);
    const userRole = request.user.role;

    console.log(userRole);

    if (requiredRole !== userRole) return false;

    return true;
  }
}
 */

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
