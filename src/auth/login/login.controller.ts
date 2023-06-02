// login.controller.ts
import {Body, Controller, Post} from '@nestjs/common';
import {LoginDto} from './login.dto';
import {AuthService} from '../auth.service';

@Controller('login')
export class LoginController {
    constructor(private readonly authService: AuthService) {
    }

    @Post()
    async login(@Body() loginDto: LoginDto): Promise<any> {
        try {
            const user = await this.authService.loginUser(loginDto);
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