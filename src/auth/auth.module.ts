import { Module } from '@nestjs/common';
import { RegisterController } from './register/register.controller';
import {AuthService} from "./auth.service";
import { LoginController } from './login/login.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  imports:[
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    })
  ],
  controllers: [
      RegisterController,
      LoginController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
