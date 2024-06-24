import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TeacherService } from 'src/features/teacher/teacher.service';

@Injectable()
export class TeacherVerificationMiddleware implements NestMiddleware {
  constructor(private readonly teacherService: TeacherService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;

    console.log('Inside middleware');
    console.log(req.body);

    if (!req.body || !email) {
      throw new HttpException(
        'Provide email address in the request body',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const user = await this.teacherService.findOne(email);

      if (!user) {
        throw new HttpException('Teacher not found', HttpStatus.NOT_FOUND);
      }

      console.log('inside teacher verification guard');
      if (!user.is_Verified) {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ message: 'Verify your OTP code' });
      }

      if (user.is_Suspended === true) {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ message: 'Teacher is suspended and cannot login' });
      }

      next();
    } catch (error) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
