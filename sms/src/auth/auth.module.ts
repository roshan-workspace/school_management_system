import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staff } from 'src/staff/entities/staff.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from './auth.guard';
import { RolesGuard } from './roles.guard';
import { Admission } from 'src/student/entities/admission.entity';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: config.get<string>('JWT_EXPIRES_IN'),
        },
      }),
    }),
     TypeOrmModule.forFeature([Staff, Admission])
  ],
  controllers: [AuthController],
  providers: [AuthService,AuthGuard,RolesGuard],
   exports: [AuthService, AuthGuard, JwtModule, RolesGuard,TypeOrmModule],
})
export class AuthModule {}
