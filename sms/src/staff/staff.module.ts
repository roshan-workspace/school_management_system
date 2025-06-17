import { Module } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staff } from './entities/staff.entity';
import { School } from 'src/school/entity/school.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Staff, School])],
  controllers: [StaffController],
  providers: [StaffService],
})
export class StaffModule {}
