import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { School } from './entity/school.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SchoolService{
  constructor(@InjectRepository(School) private schoolRepo:Repository<School>){}

  async schoolInfo(){
    const school = await this.schoolRepo.find()
    return school
  }
}