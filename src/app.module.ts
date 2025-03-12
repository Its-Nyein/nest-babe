import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { EmployeeModule } from './employee/employee.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { LoggerModule } from './logger/logger.module';
import { StudentsModule } from './students/students.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, DatabaseModule, EmployeeModule, ThrottlerModule.forRoot([
    {
      name: 'short',
      ttl: 3000,
      limit: 3,
    },
    {
      name: 'medium',
      ttl: 6000,
      limit: 4
    },
    {
      name: 'long',
      ttl: 10000,
      limit: 5
    }
  ]), LoggerModule, StudentsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
  }],
})
export class AppModule {}
