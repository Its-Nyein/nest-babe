import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        const secret = process.env.JWT_SECRET
        if(!secret) {
            throw new Error('JWT_SECRET is not defined')
        }
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: secret
        })
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    async validate(payload: {sub: number, name: string, email: string}) {
        return {id: payload.sub, name: payload.name, email: payload.email}
    }
}