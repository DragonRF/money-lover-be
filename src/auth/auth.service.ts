//auth.service.ts
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './register/register.dto';
import { User } from '../entities/user.entity';
import { LoginDto } from './login/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService
    ) {}

    async registerUser(registerDto: RegisterDto) {
        const { email, password } = registerDto;
        const userEntity: User = User.create();
        userEntity.email = email;
        userEntity.password = await bcrypt.hash(password, 10);
        await userEntity.save();
        return userEntity;
    }

    async loginUser(loginDto: LoginDto) {
        const { email, password } = loginDto;
        const userEntity: User = await User.findOne({where: {email} });

        if (!userEntity) {
            throw new NotFoundException('User not found');
        }

        const isPasswordValid = await bcrypt.compare(password, userEntity.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = {id: userEntity.id, email: userEntity.email};

        return {
            access_token: await this.jwtService.signAsync(payload),
        }
    }
}
