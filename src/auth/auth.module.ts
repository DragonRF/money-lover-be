import { Module } from '@nestjs/common';
import { RegisterController } from './register/register.controller';
import {AuthService} from "./auth.service";
import { LoginController } from './login/login.controller';

@Module({
  controllers: [RegisterController, LoginController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
