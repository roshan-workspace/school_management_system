import { Controller, Post, Body, Get, Param, ParseIntPipe, Delete } from '@nestjs/common';
import { StudentFeeService } from './student-fee.service';
import { CreateStudentFeeDto } from './dto/create-student-fee.dto';

@Controller('student-fee')
export class StudentFeeController {
  constructor(private readonly service: StudentFeeService) {}

  @Post()
  create(@Body() dto: CreateStudentFeeDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number){
    return this.service.remove(id)
  }
}
