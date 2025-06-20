import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SectionSubjectService } from './section-subject.service';
import { CreateSectionSubjectDto } from './dto/create-section-subject.dto';
import { UpdateSectionSubjectDto } from './dto/update-section-subject.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { StaffRole } from 'src/staff/constants/const';

@Controller('section-subject')
export class SectionSubjectController {
  constructor(private readonly sectionSubjectService: SectionSubjectService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(
    StaffRole.ADMIN,
    StaffRole.PRINCIPAL,
    StaffRole.VICE_PRINCIPAL,
    StaffRole.TEACHER,
  )
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

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(
    StaffRole.ADMIN,
    StaffRole.PRINCIPAL,
    StaffRole.VICE_PRINCIPAL,
    StaffRole.TEACHER,
  )
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSectionSubjectDto: UpdateSectionSubjectDto,
  ) {
    return this.sectionSubjectService.update(+id, updateSectionSubjectDto);
  }

   @UseGuards(AuthGuard, RolesGuard)
  @Roles(
    StaffRole.ADMIN,
    StaffRole.PRINCIPAL,
    StaffRole.VICE_PRINCIPAL,
    StaffRole.TEACHER,
  )
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sectionSubjectService.remove(+id);
  }
}
