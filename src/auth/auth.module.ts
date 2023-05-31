import { Module } from '@nestjs/common';
import { RegisterController } from './register/register.controller';
import {AuthService} from "./auth.service";

@Module({
  controllers: [RegisterController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
