import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { Gender, StaffRole } from './constants/const';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(StaffRole.ADMIN, StaffRole.PRINCIPAL, StaffRole.VICE_PRINCIPAL)
  @Post()
  create(@Body(ValidationPipe) createStaffDto: CreateStaffDto) {
    return this.staffService.create(createStaffDto);
  }


  
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(
    StaffRole.ADMIN,
    StaffRole.PRINCIPAL,
    StaffRole.TEACHER,
    StaffRole.ACCOUNTANT,
    StaffRole.LIBRARIAN,
    StaffRole.VICE_PRINCIPAL,
  )
  @Get()
  findWithFilter(
    @Query('gender') gender: Gender,
    @Query('username') username: string,
    @Query('name') name: string,
    @Query('subject') subject: string,
    @Query('onlyteachers') onlyteachers: boolean,
    @Query('role') role: StaffRole,
  ) {
    return this.staffService.findWithFilter(
      gender,
      username,
      name,
      subject,
      onlyteachers,
      role,
    );
  }





   @UseGuards(AuthGuard, RolesGuard)
  @Roles(
    StaffRole.ADMIN,
    StaffRole.PRINCIPAL,
    StaffRole.TEACHER,
    StaffRole.ACCOUNTANT,
    StaffRole.LIBRARIAN,
    StaffRole.VICE_PRINCIPAL,
  )
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.staffService.findOne(+id);
  }

   @UseGuards(AuthGuard, RolesGuard)
  @Roles(
    StaffRole.ADMIN,
    StaffRole.PRINCIPAL,
    StaffRole.TEACHER,
    StaffRole.ACCOUNTANT,
    StaffRole.LIBRARIAN,
    StaffRole.VICE_PRINCIPAL,
  )
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateStaffDto: UpdateStaffDto,
  ) {
    return this.staffService.update(+id, updateStaffDto);
  }

   @UseGuards(AuthGuard, RolesGuard)
  @Roles(
    StaffRole.ADMIN,
    StaffRole.PRINCIPAL,
    StaffRole.VICE_PRINCIPAL,
  )
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.staffService.remove(+id);
  }
}
