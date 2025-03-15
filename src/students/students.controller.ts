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
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  @ApiConsumes('application/json')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'John Doe',
        },
        email: {
          type: 'string',
          example: 'email@gmail.com',
        },
        password: {
          type: 'string',
          example: 'password',
        },
      },
    },
  })
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
  @ApiConsumes('application/json')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Updated Name' },
        email: { type: 'string', example: 'updated.email@example.com' },
        password: { type: 'string', example: 'updatedpassword' },
      },
    },
  })
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
