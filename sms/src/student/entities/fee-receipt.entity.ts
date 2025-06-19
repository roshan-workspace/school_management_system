import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { FeePayment } from '../fee-payment/entities/fee-payment.entity';


@Entity('fee_receipt')
export class FeeReceipt {
  @PrimaryGeneratedColumn()
  receipt_id: number;

  @OneToOne(() => FeePayment, (payment) => payment.receipt)
  @JoinColumn({ name: 'payment_id' })
  payment: FeePayment;

  @Column({ type: 'int', unique: true })
  receipt_number: number;

  @Column({ type: 'timestamp' })
  generated_at: Date;
}
