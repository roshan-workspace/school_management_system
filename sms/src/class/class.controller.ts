import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { ClassService } from './class.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { StaffRole } from 'src/staff/constants/const';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(StaffRole.ADMIN, StaffRole.PRINCIPAL, StaffRole.TEACHER)
  @Post()
  create(@Body(ValidationPipe) createClassDto: CreateClassDto) {
    return this.classService.create(createClassDto);
  }

  @Get()
  findAll() {
    return this.classService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(StaffRole.ADMIN, StaffRole.PRINCIPAL, StaffRole.TEACHER)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateClassDto: UpdateClassDto,
  ) {
    return this.classService.update(+id, updateClassDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(StaffRole.ADMIN, StaffRole.PRINCIPAL, StaffRole.TEACHER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classService.remove(+id);
  }
}
