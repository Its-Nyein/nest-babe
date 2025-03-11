import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { Prisma } from '@prisma/client';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  create(@Body() createStudentsDto: Prisma.StudentsCreateInput) {
    return this.studentsService.create(createStudentsDto);
  }

  @Get()
  findAll(@Query('name') name: string) {
    return this.studentsService.findAll(name);
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.studentsService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStudentsDto: Prisma.StudentsUpdateInput,
  ) {
    return this.studentsService.update(id, updateStudentsDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.studentsService.delete(id);
  }
}
