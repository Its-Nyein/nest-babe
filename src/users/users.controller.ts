import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {};

    /*
    GET /cats
    GET /cats/:id
    POST /cats
    PATCH /cats/:id
    DELETE /cats/:id
    */

    @Get()
    findAll(@Query('role') role: 'Developer' | 'QATester' | 'DevOps') {
        return this.userService.findAll(role)
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(+id)
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() createUserDto: CreateUserDto) {
        return this.userService.update(+id, createUserDto)
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.userService.delete(+id)
    }
}
