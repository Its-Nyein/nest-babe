/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from "@nestjs/common";
import { PassportLocalAuthGuard } from "./guards/passport-local.guard";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./guards/jwt.guard";

@Controller('auth-v2')
export class PassportAuthController {
    constructor(private readonly authService: AuthService) {};
    @HttpCode(HttpStatus.OK)
    @Post('login')
    @UseGuards(PassportLocalAuthGuard)
    login(@Request() request) {
        // we return student in local strategy
        // when i pass request.student i got errors haha:))
        return this.authService.signAsync(request.user)
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    getStudentInfo(@Request() request) {
        return request.user;
    }
}