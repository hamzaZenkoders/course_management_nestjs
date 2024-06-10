import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { StudentModule } from 'src/features/student/student.module';
import { AuthService } from './auth.service';
//import { LocalStrategy } from './local.strategy';

@Module({
  imports: [StudentModule],
  controllers: [],
  providers: [AuthService],
})
export class AuthModule {}
