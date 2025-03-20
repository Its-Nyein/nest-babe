import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma, Students } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class StudentsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(
    createStudentsDto: Prisma.StudentsCreateInput,
  ): Promise<Students> {
    const hashPassword = await bcrypt.hash(createStudentsDto.password, 10);
    return this.databaseService.students.create({
      data: {
        ...createStudentsDto,
        password: hashPassword,
      },
    });
  }

  async findAll(name: string): Promise<Students[]> {
    if (name) {
      return this.databaseService.students.findMany({
        where: {
          name,
        },
      });
    }

    return this.databaseService.students.findMany();
  }

  async findById(id: number): Promise<Students | null> {
    return this.databaseService.students.findUnique({
      where: {
        id,
      },
    });
  }

  async findByEmail(email: string): Promise<Students | null> {
    return this.databaseService.students.findUnique({
      where: {
        email
      }
    })
  }

  async update(
    id: number,
    updateStudentsDto: Prisma.StudentsUpdateInput,
  ): Promise<Students> {
    const updateData: Prisma.StudentsUpdateInput = { ...updateStudentsDto };
    if (updateStudentsDto.password) {
      updateStudentsDto.password = await bcrypt.hash(
        updateStudentsDto.password as string,
        10,
      );
    }
    return this.databaseService.students.update({
      where: {
        id,
      },
      data: updateData,
    });
  }

  async delete(id: number): Promise<Students> {
    return this.databaseService.students.delete({
      where: {
        id,
      },
    });
  }
}
