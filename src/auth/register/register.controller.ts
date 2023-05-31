import {Body, Controller, Post} from '@nestjs/common';
import {RegisterDto} from "./register.dto";
import {AuthService} from "../auth.service";

@Controller('register')
export class RegisterController {
    constructor(
        private auth: AuthService
    ) {

    }
    @Post()
    async register(@Body() registerDto: RegisterDto): Promise<any> {
        try {
            const user = await this.auth.registerUser(registerDto)
            return JSON.stringify(user)
        }catch (e) {
            return JSON.stringify({
                status: "error",
                text: e.message
            })
        }

    }
}
