import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFeePaymentDto } from './dto/create-fee-payment.dto';
import { FeePayment } from './entities/fee-payment.entity';
import { StudentFee } from '../studentFee/entities/student-fee.entity';
import { Status } from '../studentFee/constants/const';

@Injectable()
export class FeePaymentService {
  constructor(
    @InjectRepository(FeePayment)
    private readonly feePaymentRepo: Repository<FeePayment>,

    @InjectRepository(StudentFee)
    private readonly studentFeeRepo: Repository<StudentFee>,
  ) {}

  async create(dto: CreateFeePaymentDto) {

    const studentFee = await this.studentFeeRepo.findOne({
      where: { student_fee_id: dto.student_fee_id },
    });

    if (!studentFee) {
      throw new NotFoundException('Student fee record not found');
    }

    if (studentFee.status === 'paid') {
      throw new BadRequestException(
        'Fee is already marked as fully paid. No further payment is allowed.',
      );
    }

    if (dto.amount <= 0) {
      throw new BadRequestException('Payment amount must be greater than zero');
    }

    if (dto.amount > studentFee.total_due) {
      throw new BadRequestException(
        `Payment exceeds due amount. Due: ${studentFee.total_due}, Tried: ${dto.amount}`,
      );
    }

    const feePayment = this.feePaymentRepo.create({
      studentFee,
      amount: dto.amount,
      payment_date: dto.payment_date,
      payment_time: dto.payment_time,
      payment_method: dto.payment_method,
    });

    try {
      
      if (dto.amount == studentFee.total_due) {
        studentFee.status = Status.PAID;
      } else {
        studentFee.status = Status.PARTIALLYPAID;
      }
      
      studentFee.total_paid = Number(studentFee.total_paid)+Number(dto.amount);
      studentFee.total_due -= dto.amount;
      
      await this.studentFeeRepo.save(studentFee);
      const savedPayment = await this.feePaymentRepo.save(feePayment);

      const {studentFee:StudentFee, ...paymentDetails} = savedPayment
      return paymentDetails;
    } catch (err) {
      console.error('Error while creating fee payment:', err);
      throw new InternalServerErrorException('Failed to create fee payment');
    }
  }

  async findAll(): Promise<FeePayment[]> {
    return this.feePaymentRepo.find({
      relations: ['studentFee', 'studentFee.student'],
    });
  }

  async findById(id: number): Promise<FeePayment> {
    const payment = await this.feePaymentRepo.findOne({
      where: { payment_id: id },
      relations: ['studentFee', 'studentFee.student'],
    });

    if (!payment) {
      throw new NotFoundException('Fee payment not found');
    }

    return payment;
  }
}
