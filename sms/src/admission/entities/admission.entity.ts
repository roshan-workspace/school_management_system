import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Guardian } from 'src/guardian/entities/guardian.entity';
import { School } from 'src/school/entity/school.entity';

@Entity('admission')
export class Admission {
  @PrimaryGeneratedColumn()
  adm_id: number;

  @Column({ type: 'varchar', nullable: false })
  fname: string;

  @Column({ type: 'varchar', nullable: true })
  mname?: string;

  @Column({ type: 'varchar', nullable: true })
  lname?: string;

  @Column({ type: 'date', nullable: false })
  dob: Date;

  @Column({ type: 'varchar', nullable: false })
  address: string;

  @Column({ type: 'varchar', nullable: false })
  city: string;

  @Column({ type: 'varchar', nullable: false })
  state: string;

  @Column({ type: 'varchar', nullable: false })
  pin_code: string;

  @Column({ type: 'varchar', nullable: true, unique: true })
  email?: string;

  @Column({ type: 'varchar', nullable: true, unique: true })
  phone?: string;

  @Column({ type: 'date', nullable: false, default: () => 'CURRENT_DATE' })
  admission_date: Date;

  @Column({ type: 'boolean', default: false })
  any_disability: boolean;

  @Column()
  grdn_id: number;


  @Column()
  school_id: number;

  // Relation with Guardian
  @ManyToOne(() => Guardian, (guardian) => guardian.admissions, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'grdn_id' })
  guardian: Guardian;


  // relation with school
  @ManyToOne(() => School, (school) => school.admissions)
  @JoinColumn({ name: 'school_id' })
  school: School;



  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
