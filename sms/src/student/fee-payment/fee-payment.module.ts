import { Module } from '@nestjs/common';
import { FeePaymentService } from './fee-payment.service';
import { FeePaymentController } from './fee-payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentFee } from '../studentFee/entities/student-fee.entity';
import { FeePayment } from './entities/fee-payment.entity';

@Module({
  imports:[TypeOrmModule.forFeature([FeePayment, StudentFee])],
  controllers: [FeePaymentController],
  providers: [FeePaymentService],
})
export class FeePaymentModule {}
