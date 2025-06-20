import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { SchoolService } from './school.service';
import { CreateSchoolDto } from './dto/create-school.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { StaffRole } from 'src/staff/constants/const';
import { UpdateSchoolDto } from './dto/update-school.dto';

@Controller('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(StaffRole.ADMIN)
  @Post()
  async create(@Body(ValidationPipe) dto: CreateSchoolDto) {
    return await this.schoolService.create(dto);
  }

  
  @Get()
  async findAll() {
    return await this.schoolService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.schoolService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(StaffRole.ADMIN)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateSchoolDto) {
    return await this.schoolService.update(+id, dto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(StaffRole.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.schoolService.remove(+id);
  }
}
