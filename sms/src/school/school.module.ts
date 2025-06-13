import { Module } from '@nestjs/common';
import { SchoolService } from './school.service';
import { SchoolController } from './school.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { School } from './entities/school.entity';
import { CustomSchoolRepository } from './repo/school.repository';
import { DataSource } from 'typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([School])],
  controllers: [SchoolController],
  providers: [
    {provide:CustomSchoolRepository,
      useFactory:(dataSource:DataSource)=>new CustomSchoolRepository(dataSource),
      inject:[DataSource]
    },
    SchoolService],
})
export class SchoolModule {}
