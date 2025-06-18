import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateAdmissionDto } from './dto/create-admission.dto';
import { UpdateAdmissionDto } from './dto/update-admission.dto';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

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
