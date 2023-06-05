import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards
} from '@nestjs/common';
import {AuthService} from "../auth.service";
import {AuthGuard} from "../auth.guard";
@UseGuards(AuthGuard)
@Controller('profile')
export class ProfileController {
    constructor(private authService: AuthService) {}

    @Get('/')
    getProfile(@Request() req) {
        return req.user;
    }
}