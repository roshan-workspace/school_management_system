import {
  Controller,
  Get
} from '@nestjs/common';
import { SchoolService } from './school.service';

@Controller('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Get()
  async SchoolInfo() {
    const school =  await  this.schoolService.SchoolInfo();
    console.log(school[0].school_name);
    return school
  }
}
