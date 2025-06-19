import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, Check } from 'typeorm';
import { Student } from '../../entities/student.entity'
import { FeeStructure } from '../../feeStructure/entities/fee-structure.entity';
import { FeePayment } from 'src/student/fee-payment/entities/fee-payment.entity';
import { Status } from '../constants/const';

@Entity('student_fee')
export class StudentFee {
  @PrimaryGeneratedColumn()
  student_fee_id: number;

  @ManyToOne(() => Student, (s) => s.studentFees)
  @JoinColumn({ name: 'stud_id' })
  student: Student;

  @ManyToOne(() => FeeStructure, (fs) => fs.studentFees)
  @JoinColumn({ name: 'fee_struct_id' })
  feeStructure: FeeStructure;

  @Column({ type: 'numeric' })
  total_due: number;

  @Column({ type: 'numeric', default:0 })
  total_paid: number;

  @Column({ type: 'varchar', default:Status.UNPAID })
  status: Status;

  @OneToMany(() => FeePayment, (p) => p.studentFee)
  payments: FeePayment[];
}