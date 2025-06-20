import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { StaffRole } from 'src/staff/constants/const';

@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

 @UseGuards(AuthGuard, RolesGuard)
  @Roles(
    StaffRole.ADMIN,
    StaffRole.PRINCIPAL,
    StaffRole.TEACHER,
    StaffRole.VICE_PRINCIPAL,
  )
  @Post()
  create(@Body(ValidationPipe) createSubjectDto: CreateSubjectDto) {
    return this.subjectService.create(createSubjectDto);
  }
  
  
  @Get()
  findAll() {
    return this.subjectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subjectService.findOne(+id);
  }

   @UseGuards(AuthGuard, RolesGuard)
  @Roles(
    StaffRole.ADMIN,
    StaffRole.PRINCIPAL,
    StaffRole.TEACHER,
    StaffRole.VICE_PRINCIPAL,
  )
  @Patch(':id')
  update(@Param('id') id: string, @Body(ValidationPipe) updateSubjectDto: UpdateSubjectDto) {
    return this.subjectService.update(+id, updateSubjectDto);
  }


   @UseGuards(AuthGuard, RolesGuard)
  @Roles(
    StaffRole.ADMIN,
    StaffRole.PRINCIPAL,
    StaffRole.TEACHER,
    StaffRole.VICE_PRINCIPAL,
  )
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subjectService.remove(+id);
  }
}
