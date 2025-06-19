import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ValidationPipe
} from '@nestjs/common';
import { SchoolService } from './school.service';
import { CreateSchoolDto } from './dto/create-school.dto';

@Controller('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Post()
  async create(@Body(ValidationPipe) dto:CreateSchoolDto){
    return await this.schoolService.create(dto)
  }

  @Get()
  async findAll(){
    return await this.schoolService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string ){
    return await this.schoolService.findOne(+id)
  }

}
