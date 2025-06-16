import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { School } from './school/entity/school.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  // constructor(@InjectRepository(School) private schoolRepo:Repository<School>){}
  // async getHello() {
  //  const school =  await  this.schoolRepo.find()
  //  return school
  // }
}
