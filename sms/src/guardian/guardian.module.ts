import { Module } from '@nestjs/common';
import { GuardianService } from './guardian.service';
import { GuardianController } from './guardian.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guardian } from './entities/guardian.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[AuthModule,TypeOrmModule.forFeature([Guardian])],
  controllers: [GuardianController],
  providers: [GuardianService],
})
export class GuardianModule {}
