import { Module } from '@nestjs/common';
import { SectionSubjectService } from './section-subject.service';
import { SectionSubjectController } from './section-subject.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectionSubject } from './entities/section-subject.entity';
import { Section } from 'src/section/entities/section.entity';
import { Class } from 'src/class/entities/class.entity';
import { Staff } from 'src/staff/entities/staff.entity';
import { Subject } from 'src/subject/entities/subject.entity';

@Module({
  imports:[TypeOrmModule.forFeature([SectionSubject, Section, Class, Staff, Subject])],
  controllers: [SectionSubjectController],
  providers: [SectionSubjectService],
})
export class SectionSubjectModule {}
