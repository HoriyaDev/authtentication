import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Role } from './roles.enum';

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

    // async login(user: any) {
    //     const { password, ...userWithoutPassword } = user;
    //     const payload = { 
    //         ...userWithoutPassword,
    //         sub: user.id,
    //         role:user.role
    //     };
    //     return {
    //         access_token: this.jwtService.sign(payload),
    //         user: userWithoutPassword
    //     };
    // }


    async login(user: any) {
    const payload = { 
        sub: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role, // 👈 Important for Role-Based Guard
    };

    return {
        access_token: this.jwtService.sign(payload),
        user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role
        }
    };
}

}
