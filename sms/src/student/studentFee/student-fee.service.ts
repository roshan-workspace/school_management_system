import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentFeeDto } from './dto/create-student-fee.dto';
import { Student } from 'src/student/entities/student.entity';
import { StudentFee } from './entities/student-fee.entity';
import { FeeStructure } from '../feeStructure/entities/fee-structure.entity';

@Injectable()
export class StudentFeeService {
  constructor(
    @InjectRepository(StudentFee)
    private studentFeeRepo: Repository<StudentFee>,

    @InjectRepository(Student)
    private studentRepo: Repository<Student>,

    @InjectRepository(FeeStructure)
    private feeStructureRepo: Repository<FeeStructure>,
  ) {}

  async create(dto: CreateStudentFeeDto): Promise<StudentFee> {
    const student = await this.studentRepo.findOne({
      where: { stud_id: dto.stud_id },
    });
    if (!student) throw new NotFoundException('Student not found');

    const feeStructure = await this.feeStructureRepo.findOne({
      where: { fee_struct_id: dto.fee_struct_id },
    });
    if (!feeStructure) throw new NotFoundException('Fee structure not found');


    // denimicaly adding the total_due and total_paid
    const studentFee = this.studentFeeRepo.create({
      student,
      feeStructure,
      total_due: feeStructure.total_amount,
      total_paid: 0,
      status: dto.status,
    });

    try {
      return await this.studentFeeRepo.save(studentFee);
    } catch (err) {
      throw new InternalServerErrorException('Failed to create student fee');
    }
  }

  async update(id: number, updates: Partial<CreateStudentFeeDto>) {
    const studentFee = await this.studentFeeRepo.findOne({
      where: { student_fee_id: id },
    });
    if (!studentFee)
      throw new NotFoundException('Student fee record not found');

    if (updates.stud_id) {
      const student = await this.studentRepo.findOne({
        where: { stud_id: updates.stud_id },
      });
      if (!student) throw new NotFoundException('Student not found');
      studentFee.student = student;
    }

    if (updates.fee_struct_id) {
      const feeStructure = await this.feeStructureRepo.findOne({
        where: { fee_struct_id: updates.fee_struct_id },
      });
      if (!feeStructure) throw new NotFoundException('Fee structure not found');
      studentFee.feeStructure = feeStructure;
    }

    if (updates.total_due !== undefined)
      studentFee.total_due = updates.total_due;
    if (updates.total_paid !== undefined)
      studentFee.total_paid = updates.total_paid;
    if (updates.status) studentFee.status = updates.status;

    try {
      return await this.studentFeeRepo.save(studentFee);
    } catch (err) {
      throw new InternalServerErrorException('Failed to update student fee');
    }
  }

  async findAll(): Promise<StudentFee[]> {
    return this.studentFeeRepo.find({
      relations: ['student', 'feeStructure', 'payments'],
    });
  }

  async findOne(id: number) {
    const fee = await this.studentFeeRepo.findOne({
      where: { student_fee_id: id },
      relations: ['student', 'feeStructure', 'payments'],
    });

    if (!fee) throw new NotFoundException('Student fee not found');
    return fee;
  }

  async remove(id: number) {
    const result = await this.studentFeeRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Student fee record not found');
    }
    return { message: 'Student fee record deleted successfully' };
  }
}
