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
import { StudentService } from './student.service';
import { CreateAdmissionDto } from './dto/create-admission.dto';
import { UpdateAdmissionDto } from './dto/update-admission.dto';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { CreateStudentAttendanceDto } from './dto/create-student_attendance.dto';
import { UpdateStudentAttendanceDto } from './dto/update-student_attendance.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { StaffRole } from 'src/staff/constants/const';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  // -------------------- Admission Controllers ---------------------

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(StaffRole.ADMIN, StaffRole.PRINCIPAL, StaffRole.VICE_PRINCIPAL)
  @Post('/admission')
  create(@Body(ValidationPipe) createAdmissionDto: CreateAdmissionDto) {
    return this.studentService.create(createAdmissionDto);
  }

  @Get('/admission')
  findAll() {
    return this.studentService.findAll();
  }

  @Get('/admission/:id')
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(StaffRole.ADMIN, StaffRole.PRINCIPAL, StaffRole.VICE_PRINCIPAL)
  @Patch('/admission/:id')
  update(
    @Param('id') id: string,
    @Body() updateAdmissionDto: UpdateAdmissionDto,
  ) {
    return this.studentService.update(+id, updateAdmissionDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(StaffRole.ADMIN, StaffRole.PRINCIPAL, StaffRole.VICE_PRINCIPAL)
  @Delete('/admission/:id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(+id);
  }

  // ------------------- Student Attendance ---------------------------

   @UseGuards(AuthGuard, RolesGuard)
  @Roles(
    StaffRole.ADMIN,
    StaffRole.PRINCIPAL,
    StaffRole.VICE_PRINCIPAL,
    StaffRole.TEACHER,
  )
  @Post('/attendance')
  createStudentAttendance(
    @Body(ValidationPipe)
    createStudentAttendancedDto: CreateStudentAttendanceDto,
  ) {
    return this.studentService.createStudentAttendance(
      createStudentAttendancedDto,
    );
  }

 
  @Get('/attendance')
  findAllStudentAttendance() {
    return this.studentService.findAllStudentAttendance();
  }

  @Get('/attendance/:id')
  findOneAttendanceByAttendanceId(@Param('id') id: string) {
    return this.studentService.findOneAttendanceByAttendanceId(+id);
  }


   @UseGuards(AuthGuard, RolesGuard)
  @Roles(
    StaffRole.ADMIN,
    StaffRole.PRINCIPAL,
    StaffRole.VICE_PRINCIPAL,
    StaffRole.TEACHER,
  )
  @Patch('/attendance/:id')
  updateStudentAttendance(
    @Param('id') id: string,
    @Body(ValidationPipe)
    updateStudentAttendanceDto: UpdateStudentAttendanceDto,
  ) {
    return this.studentService.updateStudentAttendance(
      +id,
      updateStudentAttendanceDto,
    );
  }

   @UseGuards(AuthGuard, RolesGuard)
  @Roles(
    StaffRole.ADMIN,
    StaffRole.PRINCIPAL,
    StaffRole.VICE_PRINCIPAL,
    StaffRole.TEACHER,
  )
  @Delete(':id')
  removeStudentAttendance(@Param('id') id: string) {
    return this.studentService.removeStudentAttendance(+id);
  }

  // ----------------------- Student Controller -------------------------

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(
    StaffRole.ADMIN,
    StaffRole.PRINCIPAL,
    StaffRole.VICE_PRINCIPAL,
    StaffRole.TEACHER,
  )
  @Post()
  createStudent(@Body(ValidationPipe) createStudentDto: CreateStudentDto) {
    return this.studentService.createStudent(createStudentDto);
  }

  @Get()
  findAllStudent() {
    return this.studentService.findAllStudent();
  }

  @Get(':id')
  findOneStudentById(@Param('id') id: string) {
    return this.studentService.findOneStudentById(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(
    StaffRole.ADMIN,
    StaffRole.PRINCIPAL,
    StaffRole.VICE_PRINCIPAL,
    StaffRole.TEACHER,
  )
  @Patch(':id')
  updateStudent(
    @Param('id') id: string,
    @Body(ValidationPipe) updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentService.updateStudent(+id, updateStudentDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(
    StaffRole.ADMIN,
    StaffRole.PRINCIPAL,
    StaffRole.VICE_PRINCIPAL,
    StaffRole.TEACHER,
  )
  @Delete(':id')
  removeStudent(@Param('id') id: string) {
    return this.studentService.removeStudent(+id);
  }
}
