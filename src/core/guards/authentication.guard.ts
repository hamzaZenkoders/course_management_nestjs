import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.headers.authorization) {
      throw new HttpException('Jwt token not found', HttpStatus.NOT_FOUND);
    }

    const token = request.headers.authorization.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      request.user = this.jwtService.verify(token);
      console.log('checking req.user', request.user);
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException();
    }

    return true;
  }
}
