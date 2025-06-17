import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class} from './entities/class.entity';
import { School } from 'src/school/entity/school.entity';
import { AcademicYear } from 'src/academic-year/entity/academic-year.entity';

@Module({
   imports:[TypeOrmModule.forFeature([Class, School, AcademicYear])],
  controllers: [ClassController],
  providers: [ClassService],
})
export class ClassModule {}
