import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { Admission } from './entities/admission.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Section } from 'src/section/entities/section.entity';
import { Guardian } from 'src/guardian/entities/guardian.entity';
import { School } from 'src/school/entity/school.entity';
import { StudentAttendance } from './entities/student-attendance.entity';
import { FeeStructure } from './feeStructure/entities/fee-structure.entity';
import { StudentFee } from './studentFee/entities/student-fee.entity';
import { FeeReceipt } from './entities/fee-receipt.entity';
import { FeePaymentModule } from './fee-payment/fee-payment.module';
import { FeePayment } from './fee-payment/entities/fee-payment.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Admission, 
    Student, Section, Guardian, School, StudentAttendance, FeeStructure, StudentFee, FeePayment, FeeReceipt]), FeePaymentModule],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
