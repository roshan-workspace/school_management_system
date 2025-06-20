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
import { GuardianService } from './guardian.service';
import { CreateGuardianDto } from './dto/create-guardian.dto';
import { UpdateGuardianDto } from './dto/update-guardian.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { StaffRole } from 'src/staff/constants/const';
import { Roles } from 'src/auth/roles.decorator';

@Controller('guardian')
export class GuardianController {
  constructor(private readonly guardianService: GuardianService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(
    StaffRole.ADMIN,
    StaffRole.PRINCIPAL,
    StaffRole.TEACHER,
    StaffRole.VICE_PRINCIPAL,
  )
  @Post()
  create(@Body(ValidationPipe) createGuardianDto: CreateGuardianDto) {
    return this.guardianService.create(createGuardianDto);
  }

  @Get()
  findAll() {
    return this.guardianService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.guardianService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(
    StaffRole.ADMIN,
    StaffRole.PRINCIPAL,
    StaffRole.TEACHER,
    StaffRole.VICE_PRINCIPAL,
  )
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateGuardianDto: UpdateGuardianDto,
  ) {
    return this.guardianService.update(+id, updateGuardianDto);
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
    return this.guardianService.remove(+id);
  }
}
