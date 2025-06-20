import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards } from '@nestjs/common';
import { AcademicYearService } from './academic-year.service';
import { CreateAcademicYearDto } from './dto/create-academic-year.dto';
import { UpdateAcademicYearDto } from './dto/update-academic-year.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { StaffRole } from 'src/staff/constants/const';

@Controller('academic-year')
export class AcademicYearController {
  constructor(private readonly academicYearService: AcademicYearService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(
    StaffRole.ADMIN,
    StaffRole.PRINCIPAL,
    StaffRole.VICE_PRINCIPAL,
  )
  @Post()
  create(@Body(ValidationPipe) createAcademicYearDto:CreateAcademicYearDto) {
    return this.academicYearService.create(createAcademicYearDto)
  }


  @Get()
  findAll() {
    return this.academicYearService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.academicYearService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(
    StaffRole.ADMIN,
    StaffRole.PRINCIPAL,
    StaffRole.VICE_PRINCIPAL,
  )
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAcademicYearDto: UpdateAcademicYearDto) {
    return this.academicYearService.update(+id, updateAcademicYearDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(
    StaffRole.ADMIN,
    StaffRole.PRINCIPAL,
    StaffRole.VICE_PRINCIPAL,
  )
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.academicYearService.remove(+id);
  }
}
