import { Module } from '@nestjs/common';
import { SectionSubjectService } from './section-subject.service';
import { SectionSubjectController } from './section-subject.controller';

@Module({
  controllers: [SectionSubjectController],
  providers: [SectionSubjectService],
})
export class SectionSubjectModule {}
