import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, Ip } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Prisma } from '@prisma/client';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { LoggerService } from 'src/logger/logger.service';

@SkipThrottle()
@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}
  private readonly logger = new LoggerService(EmployeeController.name)

  // This route will skip rate limiting.
  @Post()
  create(@Body() createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.employeeService.create(createEmployeeDto);
  }

  // Rate limiting is applied to this route.
  @SkipThrottle({ default: false})
  @Get()
  findAll(@Ip() ip: string, @Query('role') role?: 'Developer' | 'QATester' | 'DevOps') {
    this.logger.log(`Request for all employees\t${ip}`, EmployeeController.name)
    return this.employeeService.findAll(role);
  }

  // Override default configuration for Rate limiting and duration.
  @Throttle({ short: { limit: 1, ttl: 3000}})
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.employeeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return this.employeeService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.employeeService.remove(id);
  }
}
