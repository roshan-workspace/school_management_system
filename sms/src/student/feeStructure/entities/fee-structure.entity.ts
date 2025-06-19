import { Class } from 'src/class/entities/class.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { StudentFee } from '../../studentFee/entities/student-fee.entity';


@Entity('fee_structure')
export class FeeStructure {
  @PrimaryGeneratedColumn()
  fee_struct_id: number;

  @Column({ type: 'numeric' })
  total_amount: number;

  @Column({ type: 'date', nullable: false })
  due_date: Date;

  @OneToOne(() => Class,(cls)=>cls.feeStructure)
  @JoinColumn({name:'class_id'})
  class: Class;

  @OneToMany(()=>StudentFee,(sf)=>sf.feeStructure)
  studentFees:StudentFee[];
}
