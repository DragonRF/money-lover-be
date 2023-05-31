import {Injectable} from '@nestjs/common';
import {RegisterDto} from "./register/register.dto";
import {User} from "../entities/user.entity";

@Injectable()
export class AuthService {
    async registerUser(registerDto: RegisterDto) {
        const {email, password} = registerDto;
        const userEntity: User = User.create();
        userEntity.email = email;
        userEntity.password = password;
        await userEntity.save()
        return userEntity;
    }
}