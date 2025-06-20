import { Module } from '@nestjs/common';
import { SectionService } from './section.service';
import { SectionController } from './section.controller';
import { Section } from './entities/section.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from 'src/class/entities/class.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[AuthModule,TypeOrmModule.forFeature([Section, Class])],
  controllers: [SectionController],
  providers: [SectionService],
})
export class SectionModule {}
