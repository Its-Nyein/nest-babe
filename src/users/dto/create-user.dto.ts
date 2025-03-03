/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsEnum(['Developer', 'QATester', 'DevOps'], {
        message: "Valid role required"
    })
    role: 'Developer' | 'QATester' | 'DevOps'
}