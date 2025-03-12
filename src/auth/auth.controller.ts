/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guards';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {};
    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() input: {email: string, password: string}) {
        return this.authService.authenticate(input)
    }

    @UseGuards(AuthGuard)
    @Get('me')
    getStudentInfo(@Request() request) {
        return request.student;
    }
}
