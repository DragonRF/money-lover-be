// login.controller.ts
import {Body, Controller, Post} from '@nestjs/common';
import {LoginDto} from './login.dto';
import {AuthService} from '../auth.service';

@Controller('/auth')
export class LoginController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('/login')
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

    @Post('/google/login')
    async loginWithGoogle(@Body() data: any): Promise<any>{
        const googleUser = await this.authService.loginWithGoogleUser(data);
        return {
            status: 'success',
            data: googleUser,
        };
    }
}