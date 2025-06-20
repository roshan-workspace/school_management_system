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
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { Gender, StaffRole } from './constants/const';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Request } from 'express';

@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}
  privilagedRoles(): StaffRole[] {
    return [StaffRole.ADMIN, StaffRole.PRINCIPAL, StaffRole.VICE_PRINCIPAL];
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(StaffRole.ADMIN, StaffRole.PRINCIPAL, StaffRole.VICE_PRINCIPAL)
  @Post()
  create(@Body(ValidationPipe) createStaffDto: CreateStaffDto) {
    return this.staffService.create(createStaffDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(StaffRole.ADMIN, StaffRole.PRINCIPAL, StaffRole.VICE_PRINCIPAL)
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

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    const { staff_id, role } = req.loginInfo;
    const requestedId = +id;
    console.log(req.loginInfo);

    if (this.privilagedRoles().includes(role) || requestedId === staff_id) {
      return this.staffService.findOne(requestedId);
    }

    throw new UnauthorizedException('You can only access your own details.');
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateStaffDto: UpdateStaffDto,
    @Req() req,
  ) {
    const { staff_id, role } = req.loginInfo;
    const requestedId = +id;
    console.log(req.loginInfo);

    if (this.privilagedRoles().includes(role) || requestedId === staff_id) {
      return this.staffService.update(requestedId, updateStaffDto);
    }
    throw new UnauthorizedException('You are not authorized to perform this action');
  }



  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    const { staff_id, role } = req.loginInfo;
    const requestedId = +id;

    if (this.privilagedRoles().includes(role) || requestedId === staff_id) {
      return this.staffService.remove(requestedId);
    }
    throw new UnauthorizedException('You are not authorized to perform this action');
  }
}
