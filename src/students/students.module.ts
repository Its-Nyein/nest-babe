import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  providers: [StudentsService],
  exports: [StudentsService],
  controllers: [StudentsController],
  imports: [DatabaseModule],
})
export class StudentsModule {}
