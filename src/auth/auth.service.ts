//auth.service.ts
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './register/register.dto';
import { User } from '../entities/user.entity';
import { LoginDto } from './login/login.dto';

@Injectable()
export class AuthService {
    async registerUser(registerDto: RegisterDto) {
        const { email, password } = registerDto;
        const userEntity: User = User.create();
        userEntity.email = email;
        userEntity.password = password;
        await userEntity.save();
        return userEntity;
    }

    async loginUser(loginDto: LoginDto) {
        const { email, password } = loginDto;
        const userEntity: User = await User.findOne({where: {email} });

        if (!userEntity) {
            throw new NotFoundException('User not found');
        }

        const isPasswordValid = await userEntity.comparePassword(password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return userEntity;
    }
}
