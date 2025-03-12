import { Injectable, UnauthorizedException } from '@nestjs/common';
import { StudentsService } from 'src/students/students.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

type AuthInput = {
    email: string,
    password: string
}

type SignInData = {
    id: number,
    name: string,
    email: string
}

type AuthResult = {
    id: number,
    name: string,
    email: string,
    accessToken: string
}

@Injectable()
export class AuthService {
    constructor(
        private readonly studentsService: StudentsService,
        private readonly jwtService: JwtService
    ) {};

    async authenticate(input: AuthInput): Promise<AuthResult> {
        const student = await this.validateStudent(input);
        if(!student) {
            throw new UnauthorizedException();
        }

        return this.signAsync(student)
    }

    async validateStudent(input: AuthInput): Promise<SignInData> {
        const student = await this.studentsService.findByEmail(input.email);
        if(!student) {
            throw new UnauthorizedException('Invalid email or password')
        }

        const isValidPassword = await bcrypt.compare(input.password, student.password);
        if(!isValidPassword) {
            throw new UnauthorizedException('Invalid email or password')
        }

        return {
            id: student.id,
            name: student.name,
            email: student.email
        }
    }

    async signAsync(student: SignInData): Promise<AuthResult> {
        const tokenPayload = {
            sub: student.id,
            name: student.name,
            email: student.email
        }

        const accessToken = await this.jwtService.signAsync(tokenPayload);
        return { id: student.id, name: student.name, email: student.email, accessToken}
    }
}
