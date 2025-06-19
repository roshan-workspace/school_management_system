import { FeeReceipt } from 'src/student/entities/fee-receipt.entity';
import { StudentFee } from 'src/student/studentFee/entities/student-fee.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';

@Entity('fee_payment')
export class FeePayment {
  @PrimaryGeneratedColumn()
  payment_id: number;

  @ManyToOne(() => StudentFee, (sf) => sf.payments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'student_fee_id' })
  studentFee: StudentFee;

  @Column({ type: 'numeric' })
  amount: number;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  payment_date: Date;

  @Column({ type: 'time', default: () => 'CURRENT_TIME' })
  payment_time: string;

  @Column({ type: 'varchar', length: 50 })
  payment_method: string;

  @OneToOne(() => FeeReceipt, (receipt) => receipt.payment, {
    cascade: true,
    nullable: true,
  })
  receipt: FeeReceipt;
}
