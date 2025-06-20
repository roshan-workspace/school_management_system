import { Module } from '@nestjs/common';
import { SchoolService } from './school.service';
import { SchoolController } from './school.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { School } from './entity/school.entity';
import { DataSource } from 'typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[AuthModule,TypeOrmModule.forFeature([School])],
  controllers: [SchoolController],
  providers: [
    SchoolService],
})
export class SchoolModule {
    constructor(public dataSource:DataSource){}
}
