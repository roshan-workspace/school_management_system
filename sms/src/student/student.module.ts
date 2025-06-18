import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { Admission } from './entities/admission.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Section } from 'src/section/entities/section.entity';
import { Guardian } from 'src/guardian/entities/guardian.entity';
import { School } from 'src/school/entity/school.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Admission, Student, Section, Guardian, School])],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
