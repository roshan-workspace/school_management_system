import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { School } from "../entities/school.entity";

@Injectable()
export class CustomSchoolRepository extends Repository<School>{
 constructor(private dataSource:DataSource){
    super(School, dataSource.createEntityManager())
 }

  async getSchoolInfo() {
    return this.createQueryBuilder('school').getMany();
  }

}