import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SectionSubjectService } from './section-subject.service';
import { CreateSectionSubjectDto } from './dto/create-section-subject.dto';
import { UpdateSectionSubjectDto } from './dto/update-section-subject.dto';

@Controller('section-subject')
export class SectionSubjectController {
  constructor(private readonly sectionSubjectService: SectionSubjectService) {}

  @Post()
  create(@Body() createSectionSubjectDto: CreateSectionSubjectDto) {
    return this.sectionSubjectService.create(createSectionSubjectDto);
  }

  @Get()
  findAll() {
    return this.sectionSubjectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sectionSubjectService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSectionSubjectDto: UpdateSectionSubjectDto) {
    return this.sectionSubjectService.update(+id, updateSectionSubjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sectionSubjectService.remove(+id);
  }
}
