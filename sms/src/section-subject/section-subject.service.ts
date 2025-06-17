import { Injectable } from '@nestjs/common';
import { CreateSectionSubjectDto } from './dto/create-section-subject.dto';
import { UpdateSectionSubjectDto } from './dto/update-section-subject.dto';

@Injectable()
export class SectionSubjectService {
  create(createSectionSubjectDto: CreateSectionSubjectDto) {
    return 'This action adds a new sectionSubject';
  }

  findAll() {
    return `This action returns all sectionSubject`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sectionSubject`;
  }

  update(id: number, updateSectionSubjectDto: UpdateSectionSubjectDto) {
    return `This action updates a #${id} sectionSubject`;
  }

  remove(id: number) {
    return `This action removes a #${id} sectionSubject`;
  }
}
