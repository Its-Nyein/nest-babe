import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { StudentsModule } from 'src/students/students.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PassportAuthController } from './passport-auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [AuthController, PassportAuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  imports: [
    StudentsModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {expiresIn: '1d'}
    }),
    PassportModule
  ]
})
export class AuthModule {}
