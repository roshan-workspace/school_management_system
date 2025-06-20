import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards } from '@nestjs/common';
import { SectionService } from './section.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { StaffRole } from 'src/staff/constants/const';

@Controller('section')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(StaffRole.ADMIN, StaffRole.PRINCIPAL, StaffRole.TEACHER)
  @Post()
  create(@Body(ValidationPipe) createSectionDto: CreateSectionDto) {
    return this.sectionService.create(createSectionDto);
  }

  @Get()
  findAll() {
    return this.sectionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sectionService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(StaffRole.ADMIN, StaffRole.PRINCIPAL, StaffRole.TEACHER)
  @Patch(':id')
  update(@Param('id') id: string, @Body(ValidationPipe) updateSectionDto: UpdateSectionDto) {
    return this.sectionService.update(+id, updateSectionDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(StaffRole.ADMIN, StaffRole.PRINCIPAL, StaffRole.TEACHER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sectionService.remove(+id);
  }
}
