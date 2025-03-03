import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    private Users = [
        { "id": 1, "name": "Alice Johnson", "email": "alice.johnson@example.com", "role": "Developer" },
        { "id": 2, "name": "Bob Smith", "email": "bob.smith@example.com", "role": "DevOps" },
        { "id": 3, "name": "Charlie Brown", "email": "charlie.brown@example.com", "role": "QATester" },
        { "id": 4, "name": "David Lee", "email": "david.lee@example.com", "role": "Developer" },
        { "id": 5, "name": "Eva Miller", "email": "eva.miller@example.com", "role": "DevOps" }
    ]

    findAll(role?: 'Developer' | 'QATester' | 'DevOps') {
        if(role) {
            const users = this.Users.filter(user => user.role === role)
            if(users.length === 0) throw new NotFoundException("Users role not found.")
            return users;
        }

        return this.Users;
    }

    findOne(id: number) {
        const user = this.Users.find(user => user.id === id)
        if(!user) throw new NotFoundException(`User ID${id} not found.`)
        return user;
    }

    create(createUserDto: CreateUserDto) {
        const id = this.Users.length + 1;
        const newUser = {
            id,
            ...createUserDto
        }

        this.Users.push(newUser)
        return newUser;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        this.Users = this.Users.map(user => {
            if(user.id === id) {
                return {...user, ...updateUserDto}
            }
            return user;
        })

        return this.findOne(id)
    }

    delete(id: number) {
        return this.Users.filter(user => user.id !== id)
    }
}
