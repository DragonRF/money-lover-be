// register.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from './register.dto';
import { AuthService } from '../auth.service';

@Controller('register')
export class RegisterController {
    constructor(private readonly authService: AuthService) {}

    @Post('/')
    async register(@Body() registerDto: RegisterDto): Promise<any> {
        try {
            const user = await this.authService.registerUser(registerDto);
            return {
                status: 'success',
                data: user,
            };
        } catch (e) {
            return {
                status: 'error',
                message: e.message,
            };
        }
    }
}
