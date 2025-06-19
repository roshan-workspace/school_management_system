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
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateAdmissionDto } from './dto/create-admission.dto';
import { UpdateAdmissionDto } from './dto/update-admission.dto';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { CreateStudentAttendanceDto } from './dto/create-student_attendance.dto';
import { UpdateStudentAttendanceDto } from './dto/update-student_attendance.dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  // -------------------- Admission Controllers ---------------------

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

  @Patch('/admission/:id')
  update(
    @Param('id') id: string,
    @Body() updateAdmissionDto: UpdateAdmissionDto,
  ) {
    return this.studentService.update(+id, updateAdmissionDto);
  }

  @Delete('/admission/:id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(+id);
  }

  // ------------------- Student Attendance ---------------------------

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
  findByStudentName(@Query('name') name: string) {
    return this.studentService.findByStudentName(name);
  }

  @Get('/attendance')
  findAllStudentAttendance() {
    return this.studentService.findAllStudentAttendance();
  }

  @Get('/attendance/:id')
  findOneAttendanceByAttendanceId(@Param('id') id: string) {
    return this.studentService.findOneAttendanceByAttendanceId(+id);
  }

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

  @Delete(':id')
  removeStudentAttendance(@Param('id') id: string) {
    return this.studentService.removeStudentAttendance(+id);
  }

  // ----------------------- Student Controller -------------------------

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

  @Patch(':id')
  updateStudent(
    @Param('id') id: string,
    @Body(ValidationPipe) updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentService.updateStudent(+id, updateStudentDto);
  }

  @Delete(':id')
  removeStudent(@Param('id') id: string) {
    return this.studentService.removeStudent(+id);
  }
}
