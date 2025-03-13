import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-local';
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        // need to set usernameField caz -> strategy expects username and password by default
        super({
            usernameField: 'email'
        });
    }

    async validate(email: string, password: string): Promise<any> {
        const student = await this.authService.validateStudent({email, password});

        if(!student) {
            throw new UnauthorizedException();
        }

        return student;
    }
}