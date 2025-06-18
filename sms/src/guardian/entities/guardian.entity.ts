import { Admission } from 'src/student/entities/admission.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('guardian')
export class Guardian {
  @PrimaryGeneratedColumn()
  grdn_id: number;

  @Column({ type: 'text', nullable: false })
  full_name: string;

  @Column({ type: 'int', nullable: false })
  age: number;

  @Column({ type: 'varchar', nullable: false })
  address: string;

  @Column({ type: 'varchar', nullable: false })
  city: string;

  @Column({ type: 'varchar', nullable: false })
  state: string;

  @Column({ type: 'varchar', nullable: false })
  pin_code: string;

  @Column({ type: 'text', nullable: false, unique:true })
  email: string;

  @Column({ type: 'varchar', nullable: false, unique:true })
  phone: string;

  @Column({ type: 'varchar', nullable: true })
  alternate_phone: string;

  @Column({ type: 'varchar', nullable: false })
  occupation: string;

  @Column({ type: 'int', nullable: false })
  income: number;

  @OneToMany(() => Admission, (admission) => admission.guardian)
  admissions: Admission[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
