import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async validateUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email);

        if (!user) throw new UnauthorizedException("user not found");

        const isMatch = await compare(password, user.password);

        if (!isMatch) throw new UnauthorizedException("InValid credentials");

        return user;
    }

    async login(user: any) {
        const { password, ...userWithoutPassword } = user;
        const payload = { 
            ...userWithoutPassword,
            sub: user.id 
        };
        return {
            access_token: this.jwtService.sign(payload),
            user: userWithoutPassword
        };
    }
}
