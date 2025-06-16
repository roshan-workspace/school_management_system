import { Module } from '@nestjs/common';
import { AdmissionService } from './admission.service';
import { AdmissionController } from './admission.controller';
import { Admission } from './entities/admission.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Admission])],
  controllers: [AdmissionController],
  providers: [AdmissionService],
})
export class AdmissionModule {}
