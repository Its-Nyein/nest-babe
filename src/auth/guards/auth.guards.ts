/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

interface CustomRequest extends Request {
    student?: {
        id: string;
        name: string;
        email: string;
    };
}

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {};

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<CustomRequest>();
        const authorization = request.headers.authorization;
        const token = authorization?.split(" ")[1];

        if (!token) {
            throw new UnauthorizedException("Invalid token format");
        }

        try {
            const tokenPayload = await this.jwtService.verifyAsync(token);
            request.student = {
                id: tokenPayload.sub,
                name: tokenPayload.name,
                email: tokenPayload.email
            };
            return true;
        } catch (error) {
            console.log(error);
            throw new UnauthorizedException();
        }
    }
}