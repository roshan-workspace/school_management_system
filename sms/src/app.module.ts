import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SchoolModule } from './school/school.module';
import { AcademicYearModule } from './academic-year/academic-year.module';
import { GuardianModule } from './guardian/guardian.module';
import { AdmissionModule } from './admission/admission.module';
import { SubjectModule } from './subject/subject.module';
import { ClassModule } from './class/class.module';
import { SectionModule } from './section/section.module';
import { SectionSubjectModule } from './section-subject/section-subject.module';
import { StaffModule } from './staff/staff.module';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.local.env',
          //  envFilePath:".prod.env"
        }),
      ],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        synchronize: configService.get<boolean>('DB_SYNC'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
      }),

      inject: [ConfigService],
    }),
    SchoolModule,
    AcademicYearModule,
    GuardianModule,
    AdmissionModule,
    SubjectModule,
    ClassModule,
    SectionModule,
    SectionSubjectModule,
    StaffModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
