import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { StudentService } from 'src/features/student/student.service';

@Injectable()
export class VerificationMiddleware implements NestMiddleware {
  constructor(private readonly studentService: StudentService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;

    console.log('Inside middleware');
    console.log(req.body);

    if (!req.body) {
      throw new HttpException(
        'Provide email address and password',
        HttpStatus.FORBIDDEN,
      );
    }

    if (email) {
      const user = await this.studentService.findOne(email);
      if (user) {
        if (user.isVerified === false) {
          res
            .status(HttpStatus.UNAUTHORIZED)
            .json({ message: 'Verify your otp code' });
        } else {
          next();
        }
      }

      //next();
    }
  }
}
