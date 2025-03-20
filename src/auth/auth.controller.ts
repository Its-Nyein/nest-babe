/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put, Request, UseGuards } from '@nestjs/common';
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

    @UseGuards(AuthGuard)
    @Put('change-password')
    changePassword(@Body() input: {email: string, password: string, newPassword: string}) {
        return this.authService.changePassword({email: input.email, password: input.password}, input.newPassword)
    }
}
