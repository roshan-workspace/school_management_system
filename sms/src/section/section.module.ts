import { Module } from '@nestjs/common';
import { SectionService } from './section.service';
import { SectionController } from './section.controller';
import { Section } from './entities/section.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from 'src/class/entities/class.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Section, Class])],
  controllers: [SectionController],
  providers: [SectionService],
})
export class SectionModule {}
